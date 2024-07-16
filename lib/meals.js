import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { app as firebaseApp } from "./firebase/init-app";

const db = sql("meals.db");

export const getMeals = async () => {
  const meals = db.prepare("SELECT * FROM meals;").all();
  const storage = getStorage(firebaseApp);

  for (const meal of meals) {
    const imageRef = ref(storage, meal.image);
    meal.image = await getDownloadURL(imageRef);
  }

  return meals;
};

export const getMeal = async (slug) => {
  const meal = db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);

  const storage = getStorage(firebaseApp);
  const imageRef = ref(storage, meal.image);
  meal.image = await getDownloadURL(imageRef);

  return meal;
};

export const saveMeal = async (meal) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;
  const bufferedImage = await meal.image.arrayBuffer();

  const storage = getStorage(firebaseApp);
  const imageRef = ref(storage, fileName);
  await uploadBytes(imageRef, bufferedImage, {
    contentType: `image/${extension}`,
  });

  meal.image = fileName;

  db.prepare(
    `
    INSERT INTO meals
      (slug, title, summary, creator, creator_email, instructions, image)
    VALUES (
      @slug,
      @title,
      @summary,
      @creator,
      @creator_email,
      @instructions,
      @image
    );
  `
  ).run(meal);
};
