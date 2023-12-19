import { useEffect, useState } from 'react';
import Dimensions from './Sidebar/Filters/Dimensions';
import CheckboxTree from 'react-checkbox-tree';
import MultiSelect from '@kenshooui/react-multi-select';

import { setActiveSort } from '../../lib/product';

import { FiChevronRight, FiChevronDown } from 'react-icons/fi';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import { FaRegPlusSquare, FaRegMinusSquare } from 'react-icons/fa';

import Title from './Sidebar/Title';
import { IoMdCheckmark } from 'react-icons/io';

const ShopSidebar = ({
    brands,
    allBrands,
    categories,
    colors,
    materials,
    showBrands,
    slectedCategory,
    getSortParams
}) => {
    const MAX_DIMENSION = 900;

    const [widths, setWidths] = useState([0, MAX_DIMENSION]);
    const [depths, setDepts] = useState([0, MAX_DIMENSION]);
    const [heights, setHeights] = useState([0, MAX_DIMENSION]);
    const [unit, setUnit] = useState('cm');
    const [dimensionKey, setdimensionKey] = useState(new Date().getTime());

    const [checked, setChecked] = useState(slectedCategory);
    const [slectedMaterials, setSelectedMaterials] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [showMoreSelectedBrands, setShowMoreSelectedBrands] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [expandedMaterials, setExpandedMaterials] = useState([]);
    const [expandedBrands, setExpandedBrands] = useState([]);

    const [isDimensionOpen, setIsDimensionOpen] = useState(false);
    const [isMaterialOpen, setIsMaterialOpen] = useState(false);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [isBrandOpen, setIsBrandOpen] = useState(false);
    const [isColorsOpen, setIsColorsOpen] = useState(false);

    const [showMoreBrands, setShowMoreBrands] = useState(false);

    const colorsInRow = 4;

    const handleSelectMoreBrands = (brands) => {
        setShowMoreSelectedBrands(brands);

        setSelectedBrands(brands.map((brand) => brand.id));
    };

    useEffect(() => {
        getSortParams('dimension', {
            unit,
            widths,
            depths,
            heights
        });
    }, [unit, widths, depths, heights]);

    useEffect(() => {
        getSortParams('categories', checked);
    }, [checked]);

    useEffect(() => {
        getSortParams('materials', slectedMaterials);
    }, [slectedMaterials]);

    useEffect(() => {
        getSortParams('brands', selectedBrands);
    }, [selectedBrands]);

    useEffect(() => {
        getSortParams('brands', selectedBrands);
    }, [selectedBrands]);

    useEffect(() => {
        getSortParams('colors', selectedColors);
    }, [selectedColors]);

    useEffect(() => {
        const _selectedBrands = selectedBrands.map((brand) => parseInt(brand));

        const selected = allBrands.filter((brand) =>
            _selectedBrands.includes(brand.id)
        );

        setShowMoreSelectedBrands(selected);
    }, [showMoreBrands]);

    const onColorClick = value => {
        let colors = selectedColors;

        colors = colors.indexOf(value) === -1
            ? [...colors, value]
            : colors.filter(el => el !== value);
        if (colors.length > 3) {
            colors.shift();
        }
        setSelectedColors(colors);
        return false;
    }

    return (
        <div
            className='shop-sidebar'
            style={{
                maxWidth: '330px'
            }}>
            <h2 className='filter-by d-flex justify-content-between space-mb--30'>
                <span>Filter By</span>
                <ul className='single-sidebar-widget__list single-sidebar-widget__list--category'>
                    <li>
                        <button
                            onClick={(e) => {
                                getSortParams('categories', []);
                                getSortParams('brand', []);
                                getSortParams('materials', []);
                                getSortParams('colors', []);

                                setUnit('cm');
                                setWidths([0, MAX_DIMENSION]);
                                setDepts([0, MAX_DIMENSION]);
                                setHeights([0, MAX_DIMENSION]);

                                getSortParams('dimension', {
                                    unit,
                                    widths,
                                    depths,
                                    heights
                                });

                                setdimensionKey(new Date().getTime());

                                setSelectedMaterials([]);
                                setExpandedMaterials([]);
                                setChecked([]);
                                setExpanded([]);
                                setActiveSort(e);

                                setIsDimensionOpen(false);
                                setIsMaterialOpen(false);
                                setIsCategoriesOpen(false);
                                setIsBrandOpen(false);
                            }}
                            className='active'>
                            Clear All
                        </button>
                    </li>
                </ul>
            </h2>

            {/* categories list */}
            <div className='single-sidebar-widget space-mb--40'>
                <Title
                    value='Categories'
                    onClickHandler={() =>
                        setIsCategoriesOpen(!isCategoriesOpen)
                    }
                    isOpen={isCategoriesOpen}
                />

                {isCategoriesOpen && (
                    <>
                        <ul className='single-sidebar-widget__list single-sidebar-widget__list--category mb-2'>
                            <li>
                                <button
                                    onClick={(e) => {
                                        getSortParams('categories', []);
                                        setChecked([]);
                                        setExpanded([]);
                                        setActiveSort(e);
                                    }}
                                    className='active'>
                                    Clear categories
                                </button>
                            </li>
                        </ul>

                        <CheckboxTree
                            nodes={categories}
                            checked={checked}
                            expanded={expanded}
                            onCheck={(checked) => setChecked(checked)}
                            onExpand={(expanded) => setExpanded(expanded)}
                            icons={{
                                check: <ImCheckboxChecked />,
                                uncheck: <ImCheckboxUnchecked />,
                                halfCheck: <ImCheckboxChecked />,
                                expandClose: <FiChevronRight />,
                                expandOpen: <FiChevronDown />,
                                expandAll: <FaRegPlusSquare />,
                                collapseAll: <FaRegMinusSquare />,
                                parentClose: <span></span>,
                                parentOpen: <span></span>,
                                leaf: <span></span>
                            }}
                        />
                    </>
                )}
            </div>

            {/* brands list */}
            {showBrands && (
                <div className='single-sidebar-widget space-mb--40'>
                    <Title
                        value='Brands'
                        onClickHandler={() => setIsBrandOpen(!isBrandOpen)}
                        isOpen={isBrandOpen}
                    />

                    {isBrandOpen && (
                        <>
                            {brands.length > 0 ? (
                                <>
                                    <ul className='single-sidebar-widget__list single-sidebar-widget__list--category mb-2'>
                                        <li>
                                            <button
                                                onClick={(e) => {
                                                    getSortParams('brands', []);
                                                    setSelectedBrands([]);
                                                    setExpandedBrands([]);
                                                    setActiveSort(e);
                                                }}
                                                className='active'>
                                                Clear brands
                                            </button>
                                        </li>
                                    </ul>

                                    <CheckboxTree
                                        nodes={brands}
                                        checked={selectedBrands}
                                        expanded={expandedBrands}
                                        onCheck={(checked) =>
                                            setSelectedBrands(checked)
                                        }
                                        onExpand={(expanded) =>
                                            setExpandedBrands(expanded)
                                        }
                                        icons={{
                                            check: <ImCheckboxChecked />,
                                            uncheck: <ImCheckboxUnchecked />,
                                            halfCheck: <ImCheckboxChecked />,
                                            expandClose: <FiChevronRight />,
                                            expandOpen: <FiChevronDown />,
                                            expandAll: <FaRegPlusSquare />,
                                            collapseAll: <FaRegMinusSquare />,
                                            parentClose: <span></span>,
                                            parentOpen: <span></span>,
                                            leaf: <span></span>
                                        }}
                                    />

                                    <ul className='single-sidebar-widget__list single-sidebar-widget__list--category mt-2'>
                                        <li>
                                            <button
                                                onClick={(e) => {
                                                    setShowMoreBrands(true);
                                                    setActiveSort(e);
                                                }}
                                                className='active'>
                                                Show more...
                                            </button>
                                        </li>
                                    </ul>
                                </>
                            ) : (
                                'No brands found'
                            )}
                        </>
                    )}
                </div>
            )}

            {/* dimensions list */}
            <div className='single-sidebar-widget space-mb--40'>
                <Title
                    value='Dimensions'
                    onClickHandler={() => setIsDimensionOpen(!isDimensionOpen)}
                    isOpen={isDimensionOpen}
                />

                {isDimensionOpen && (
                    <Dimensions
                        key={dimensionKey}
                        unit={unit}
                        widths={widths}
                        depths={depths}
                        heights={heights}
                        setWidths={setWidths}
                        setDepts={setDepts}
                        setHeights={setHeights}
                        setUnit={setUnit}
                    />
                )}
            </div>

            {/* materials list */}
            <div className='single-sidebar-widget space-mb--40'>
                <Title
                    value='Materials'
                    onClickHandler={() => setIsMaterialOpen(!isMaterialOpen)}
                    isOpen={isMaterialOpen}
                />

                {isMaterialOpen && (
                    <>
                        <ul className='single-sidebar-widget__list single-sidebar-widget__list--category mb-2'>
                            <li>
                                <button
                                    onClick={(e) => {
                                        getSortParams('materials', []);
                                        setSelectedMaterials([]);
                                        setExpandedMaterials([]);
                                        setActiveSort(e);
                                    }}
                                    className='active'>
                                    Clear materials
                                </button>
                            </li>
                        </ul>

                        <CheckboxTree
                            nodes={materials}
                            checked={slectedMaterials}
                            expanded={expandedMaterials}
                            onCheck={(checked) => setSelectedMaterials(checked)}
                            onExpand={(expanded) =>
                                setExpandedMaterials(expanded)
                            }
                            icons={{
                                check: <ImCheckboxChecked />,
                                uncheck: <ImCheckboxUnchecked />,
                                halfCheck: <ImCheckboxChecked />,
                                expandClose: <FiChevronRight />,
                                expandOpen: <FiChevronDown />,
                                expandAll: <FaRegPlusSquare />,
                                collapseAll: <FaRegMinusSquare />,
                                parentClose: <span></span>,
                                parentOpen: <span></span>,
                                leaf: <span></span>
                            }}
                        />
                    </>
                )}
            </div>

            {/* colors list */}
            <div className='single-sidebar-widget space-mb--40'>
                <Title
                    value='Colors'
                    onClickHandler={() => setIsColorsOpen(!isColorsOpen)}
                    isOpen={isColorsOpen}
                />

                {isColorsOpen && (
                    <>
                        <ul className='single-sidebar-widget__list single-sidebar-widget__list--category mb-2'>
                            <li>
                                <button
                                    onClick={(e) => {
                                        getSortParams('colors', []);
                                        setSelectedColors([]);
                                        setActiveSort(e);
                                    }}
                                    className='active'>
                                    Clear colors
                                </button>
                            </li>
                        </ul>

                        <div className='colors-wrapper'>
                            { // split all major colors to 4 columns in row
                                Array.from({length: Math.ceil(colors.length / colorsInRow)}).map((el, row) => {
                                 return <div className="row" key={row}>
                                    { colors.slice(row * colorsInRow, (row + 1) * colorsInRow).map((color, i) => {
                                        const index = row * colorsInRow + i;
                                        return (
                                            <div
                                                className='col-3'
                                                key={index}
                                            >
                                                <div 
                                                    className="color" 
                                                    style={{backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`}}
                                                    onClick={() => onColorClick(index)}
                                                >
                                                    { Array.isArray(selectedColors) && selectedColors.indexOf(index) > -1 
                                                        ? <IoMdCheckmark /> 
                                                        : <span>&nbsp;</span> 
                                                    }
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            })}
                        </div>
                    </>
                )}
            </div>

            {showMoreBrands && (
                <div className='d-flex justify-content-center modal modal-dialog-centered modal-video'>
                    <div
                        className='modal-body mt-5'
                        style={{ maxWidth: '40%' }}>
                        <button
                            type='button'
                            onClick={() => setShowMoreBrands(false)}
                            className='btn btn-danger position-absolute'
                            style={{ top: '-20px', right: '15px' }}>
                            Close
                        </button>
                        <MultiSelect
                            items={allBrands}
                            responsiveHeight='800px'
                            selectedItems={showMoreSelectedBrands}
                            onChange={handleSelectMoreBrands}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShopSidebar;
