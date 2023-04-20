import { useState } from "react";
import { HiFilter, HiPlusSm } from "react-icons/hi";
import "./styles.css";
const Filter = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const categories = [
    { id: 1, description: "Category1" },
    { id: 2, description: "Category2" },
    { id: 3, description: "Category3" },
    { id: 4, description: "Category4" },
    { id: 6, description: "Category5" },
    { id: 7, description: "Category6" },
    { id: 8, description: "Category7" },
    { id: 9, description: "Category8" },
    { id: 10, description: "Category9" },
    { id: 11, description: "Category10" },
    { id: 12, description: "Category11" },
    { id: 13, description: "Category12" },
    { id: 14, description: "Category13" },
    { id: 15, description: "Category14" },
    { id: 16, description: "Category15" },
    { id: 17, description: "Category16" },
    { id: 17, description: "Category17" },
  ];

  const handleOpenFilter = (status: boolean) => {
    if (!status) {
      setOpenFilter(true);
    } else {
      const ascend = document.querySelector(".filter__main");
      ascend?.classList.add("ascend-animation");
      setTimeout(() => setOpenFilter(false), 300);
    }
  };

  const handleCategoryClick = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleCleanFilter = () => {
    setSelectedCategories([]);
  };
  return (
    <div className="filter__container">
      <button
        onClick={() => handleOpenFilter(openFilter)}
        className="filter__btn"
      >
        <HiFilter className="filter__btn-icon" />
        <h2 className="filter__btn-label">Filtrar</h2>
      </button>

      {openFilter && (
        <div className={`filter__main descend-animation`}>
          <section>
            <h2 className="filter__main-title">Categoria</h2>
          </section>

          <section className="filter__main-list-categories">
            {categories.map((category) => (
              <button
                onClick={() => handleCategoryClick(category.description)}
                key={category.id}
                className={
                  selectedCategories.includes(category.description)
                    ? "category__item--selected"
                    : "filter__main-category-item"
                }
              >
                {category.description}
                <HiPlusSm />
              </button>
            ))}
          </section>

          <section className="filter__controls">
            <button
              onClick={() => handleCleanFilter()}
              className="filter__control control__clean"
            >
              Limpar Filtros
            </button>
            <button className="filter__control control__apply">
              Aplicar Filtros
            </button>
          </section>
        </div>
      )}
    </div>
  );
};

export default Filter;
