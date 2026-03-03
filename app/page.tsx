import CategoryList from "./components/category-list";
import Header from "./components/header";
import Search from "./components/search";

export default function Home() {
  return (
    <>
      <Header />
      <div className="px-5">
        <Search />
      </div>
      <div className="px-5 pt-4">
        <CategoryList />
      </div>
    </>
  );
}
