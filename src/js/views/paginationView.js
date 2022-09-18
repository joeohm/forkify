import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupBtn('first', numPages);
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupBtn('last', numPages);
    }

    // Other page
    if (curPage < numPages) {
      console.log('bajs');
      return this._generateMarkupBtn('other', numPages);
    }
    // Page 1, and there are no other pages
    if (curPage === 1 && numPages <= 1) {
      return '';
    }
  }

  _generateMarkupBtn(page, numPages) {
    // const pageNumber = this._data.page;
    //   direction === 'prev' ? (pageNumber -= 1) : (pageNumber += 1);
    //   return `
    //   <button data-goto="${pageNumber}" class="btn--inline pagination__btn--${direction}">
    //     ${direction === 'next' ? `<span>Page ${pageNumber}</span>` : ''}
    //     <svg class="search__icon">
    //        <use href="${icons}#icon-arrow-${
    //     direction === 'next' ? 'right' : 'left'
    //   }"></use>
    //     </svg>
    //     ${direction === 'prev' ? `<span>Page ${pageNumber}</span>` : ''}
    //   </button>
    // `;
    //     }
    const curPage = this._data.page;
    const prevPage = `
              <button data-goto="${
                curPage - 1
              }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1}</span>
              </button>
              `;
    const displayPages = `
              <div>
                </br>
                </br>
                <p class="heading--3" style="text-align: center">
                  <span >Page ${curPage}/${numPages}</span>
                </p>
              </div
              `;
    const nextPage = `
              <button data-goto="${
                curPage + 1
              }" class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
              </button>
                  `;
    if (page === 'first') return `${nextPage}${displayPages}`;
    if (page === 'last') return `${prevPage}${displayPages}`;
    if (page === 'other') return `${prevPage}${nextPage}${displayPages}`;
  }
}

export default new PaginationView();
