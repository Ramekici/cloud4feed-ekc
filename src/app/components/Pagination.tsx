import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';


const Pagination: React.FC<{
    className: string, pageSize: number,
    currentPage: number, totalCount: number, onPageChange: (p: number) => void,
    onPageSize: (s: number) => void
}> =
    ({ className, pageSize, currentPage, totalCount, onPageChange, onPageSize }) => {
        const siblingCount = 1;
        const paginationRange = usePagination({
            currentPage,
            totalCount,
            siblingCount,
            pageSize
        });

        if (currentPage === 0 || paginationRange!.length < 2) {
            return null;
        }

        const onNext = () => {
            onPageChange(currentPage + 1);
        };

        const onPrevious = () => {
            onPageChange(currentPage - 1);
        };

        let lastPage = paginationRange![paginationRange!.length - 1];
        return (
            <div className='d-flex align-items-end'>
                <ul
                    className={classnames('pagination-container', { [className]: className })}
                >
                    <li
                        className={classnames('pagination-item', {
                            disabled: currentPage === 1
                        })}
                        onClick={onPrevious}
                    >
                        <div className="arrow left" />
                    </li>
                    {paginationRange!.map(pageNumber => {
                        if (pageNumber === DOTS) {
                            return <li className="pagination-item dots">&#8230;</li>;
                        }

                        return (
                            <li
                                className={classnames('pagination-item', {
                                    selected: pageNumber === currentPage
                                })}
                                onClick={() => onPageChange(pageNumber)}
                            >
                                {pageNumber}
                            </li>
                        );
                    })}
                    <li
                        className={classnames('pagination-item', {
                            disabled: currentPage === lastPage
                        })}
                        onClick={onNext}
                    >
                        <div className="arrow right" />
                    </li>
                </ul>
                <div className='d-flex flex-column align-items-end'>
                    <label> Per Page</label>
                    <select
                        className='btn'
                        style={{ height: '2rem', width: '72px' }}
                        name="perpage"
                        value={pageSize}
                        onChange={(event) => onPageSize(parseInt(event.target.value))}
                    // onBlur={handleBlur}

                    >
                        <option value="" label="Select Per Page">
                            Select Per page{" "}
                        </option>
                        <option value="10" label="10">
                            {" "}
                            10
                        </option>
                        <option value="20" label="20">
                            20
                        </option>
                        <option value="50" label="50">
                            20
                        </option>
                        <option value="100" label="100">
                            20
                        </option>
                    </select>
                </div>

            </div>
        );
    };

export default Pagination;