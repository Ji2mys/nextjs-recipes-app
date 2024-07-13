"use server";

import { redirect } from "next/navigation";

import { saveMeal } from "./meals";

function isTextEmpty(text = "") {
  return text.trim() == "";
}

export const shareMeal = async (prevState, formData) => {
  const meal = {
    creator: formData.get("name"),
    creator_email: formData.get("email"),
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
  };

  let errorMessage = "";

  if (isTextEmpty(meal.creator)) {
    errorMessage = "You must enter your name.";
  } else if (
    isTextEmpty(meal.creator_email) ||
    meal.creator_email.split("@").length < 2
  ) {
    errorMessage = "Email is invalid.";
  } else if (
    isTextEmpty(meal.title) ||
    isTextEmpty(meal.summary) ||
    isTextEmpty(meal.instructions)
  ) {
    errorMessage =
      "You must write a title, a summary and instructions for the recipe.";
  } else if (!meal.image || meal.image.size === 0) {
    errorMessage = "You must select an image.";
  }

  if (errorMessage) return { message: errorMessage };

  await saveMeal(meal);
  redirect("/meals");
};
