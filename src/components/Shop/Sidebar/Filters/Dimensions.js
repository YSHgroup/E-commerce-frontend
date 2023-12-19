import RangeInput from './RangeInput';

export default function Dimensions({
    unit,
    widths,
    depths,
    heights,
    setWidths,
    setDepts,
    setHeights,
    setUnit
}) {
    return (
        <div className='single-sidebar-widget space-mb--40'>
            <div className='d-flex justify-content-end single-sidebar-widget__title space-mb--30'>
                <div className='btn-group btn-group-toggle'>
                    <label
                        className={
                            unit === 'cm'
                                ? 'btn btn-sm btn-secondary active'
                                : 'btn btn-sm btn-secondary'
                        }>
                        <input
                            type='radio'
                            name='unit'
                            autoComplete='off'
                            onChange={() => {
                                setUnit('cm');
                            }}
                        />{' '}
                        cm
                    </label>
                    <label
                        className={
                            unit === 'in'
                                ? 'btn btn-sm btn-secondary active'
                                : 'btn btn-sm btn-secondary'
                        }>
                        <input
                            type='radio'
                            name='unit'
                            autoComplete='off'
                            onChange={() => {
                                setUnit('in');
                            }}
                        />{' '}
                        in
                    </label>
                </div>
            </div>

            <ul className='single-sidebar-widget__list single-sidebar-widget__list--category'>
                <li>
                    <RangeInput
                        title='Width'
                        defaultValues={widths}
                        onChange={(values) => setWidths(values)}
                    />
                </li>

                <li>
                    <RangeInput
                        title='Depth'
                        defaultValues={depths}
                        onChange={(values) => setDepts(values)}
                    />
                </li>

                <li>
                    <RangeInput
                        title='Height'
                        defaultValues={heights}
                        onChange={(values) => setHeights(values)}
                    />
                </li>
            </ul>
        </div>
    );
}
