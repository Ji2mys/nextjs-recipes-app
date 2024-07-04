export default function SlugMealPage({ params }) {
  return (
    <main style={{ textAlign: "center", color: "white" }}>
      <h1>Slug Meal Page</h1>
      <p>{params.slug}</p>
    </main>
  );
}
