import { useEffect, useState } from "react";
import { HiFilter, HiPlusSm } from "react-icons/hi";
import "./styles.css";
import { useGlobal } from "../../contexts/GlobalContext";
import { Category } from "../../types";
const Filter = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const {
    handleGetRegisters,
    transactions,
    setTransactions,
    categories,
    getCategories,
  } = useGlobal();

  const handleOpenFilter = (status: boolean) => {
    if (!status) {
      setOpenFilter(true);
    } else {
      const ascend = document.querySelector(".filter__main");
      ascend?.classList.add("ascend-animation");
      setTimeout(() => setOpenFilter(false), 300);
    }
  };

  const handleCategoryClick = (category: Category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleCleanFilter = () => {
    setSelectedCategories([]);
    handleGetRegisters();
  };
  const handleApplyFilter = () => {
    const listFilteredTransactions = transactions.filter((transaction) =>
      selectedCategories.some(
        (selected) => selected.id === transaction.category_id
      )
    );

    if (listFilteredTransactions.length) {
      setTransactions(listFilteredTransactions);
    } else {
      handleGetRegisters();
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="filter__container">
      <div className="filter__section-button">
        <button
          onClick={() => handleOpenFilter(openFilter)}
          className="filter__btn"
        >
          <HiFilter className="filter__btn-icon" />
          <h2 className="filter__btn-label">Filtro</h2>
        </button>
      </div>

      {openFilter && (
        <div className={`filter__main descend-animation`}>
          <section>
            <h2 className="filter__main-title">Categoria</h2>
          </section>

          <section className="filter__main-list-categories">
            {categories.map((category) => (
              <button
                onClick={() => handleCategoryClick(category)}
                key={category.id}
                className={
                  selectedCategories.includes(category)
                    ? "category__item--selected"
                    : "filter__main-category-item"
                }
              >
                {category.title}
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
            <button
              onClick={() => handleApplyFilter()}
              className="filter__control control__apply"
            >
              Aplicar Filtros
            </button>
          </section>
        </div>
      )}
    </div>
  );
};

export default Filter;
