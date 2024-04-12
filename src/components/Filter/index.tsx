import { Dispatch, SetStateAction, useState } from "react";
import { HiPlusSm } from "react-icons/hi";
import { HiBarsArrowDown, HiBarsArrowUp } from "react-icons/hi2";

import { useQueryClient } from "@tanstack/react-query";
import { useGetAll } from "../../services/query";
import { Category } from "../../models";
import { ParamsType } from "../Dashboard";
import "./styles.css";

interface FilterProps {
  params: ParamsType;
  setParams: Dispatch<SetStateAction<ParamsType>>;
  refetch: any;
  setTotalItems: any;
  currentPage: any;
}

const Filter = ({ params, setParams, refetch }: FilterProps) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedTab, setSelectedTab] = useState(1);
  const queryClient = useQueryClient();

  const { data } = useGetAll<Category[]>({ url: "categorias" });

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
    if (params.categories.includes(category.id)) {
      setParams({
        ...params,
        categories: params.categories.filter((id) => id !== category.id),
      });
    } else {
      setParams({
        ...params,
        categories: [...params.categories, category.id],
      });
    }
  };

  const handleCleanFilter = async () => {
    setParams({
      skip: 0,
      take: 10,
      categories: [],
    });
    await queryClient.invalidateQueries({ queryKey: ["transacao/listar"] });
    refetch();
  };

  return (
    <div className="filter__container">
      <div className="filter__section-button">
        <button
          onClick={() => handleOpenFilter(openFilter)}
          className="filter__btn"
        >
          {openFilter ? (
            <HiBarsArrowUp size={25} className="filter__btn-icon" />
          ) : (
            <HiBarsArrowDown size={25} className="filter__btn-icon" />
          )}
        </button>
      </div>

      {openFilter && (
        <div className={`filter__main descend-animation`}>
          <section className="filter__tabs">
            <button
              onClick={() => setSelectedTab(1)}
              className={
                selectedTab === 1
                  ? "filter__tab tab-left active-tab"
                  : "filter__tab tab-left"
              }
            >
              Categorias
            </button>

            {/* <button
              onClick={() => setSelectedTab(2)}
              className={
                selectedTab === 2
                  ? "filter__tab tab-right active-tab"
                  : "filter__tab tab-right"
              }
            >
              Outros..
            </button> */}
          </section>

          <div className="filter__content">
            {selectedTab === 1 ? (
              <div>
                <section className="filter__main-list-categories">
                  {data &&
                    data.map((category) => (
                      <button
                        onClick={() => handleCategoryClick(category)}
                        key={category.id}
                        className={
                          params.categories.includes(category.id)
                            ? "category__item--selected"
                            : "filter__main-category-item"
                        }
                      >
                        {category.title}
                        <HiPlusSm />
                      </button>
                    ))}
                </section>
              </div>
            ) : (
              <div>
                <h1>Outros...</h1>
              </div>
            )}
          </div>
          <section className="filter__controls">
            <button
              onClick={() => handleCleanFilter()}
              className="filter__control control__clean"
            >
              Limpar
            </button>
            <button
              onClick={() => refetch()}
              className="filter__control control__apply"
            >
              Aplicar
            </button>
          </section>
        </div>
      )}
    </div>
  );
};

export default Filter;
