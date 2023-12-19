import { useEffect, useState } from 'react';
import { Range, getTrackBackground } from 'react-range';

const STEP = 0.01;
const MIN = 0;
const MAX = 900;

export default function RangeInput({ title, defaultValues, onChange }) {
    const [values, setValues] = useState(defaultValues);

    useEffect(() => {
        if (onChange) {
            onChange(values);
        }
    }, [values]);

    return (
        <div>
            <label>{title}</label>
            <Range
                draggableTrack
                values={values}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={(values) => {
                    setValues(values);
                }}
                renderTrack={({ props, children }) => (
                    <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={{
                            ...props.style,
                            height: '36px',
                            display: 'flex',
                            width: '100%'
                        }}>
                        <div
                            ref={props.ref}
                            style={{
                                height: '4px',
                                width: '100%',
                                borderRadius: '4px',
                                background: getTrackBackground({
                                    values,
                                    colors: ['#ccc', '#000', '#ccc'],
                                    min: MIN,
                                    max: MAX
                                }),
                                alignSelf: 'center'
                            }}>
                            {children}
                        </div>
                    </div>
                )}
                renderThumb={({ props, isDragged }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: '24px',
                            width: '24px',
                            borderRadius: '24px',
                            backgroundColor: '#FFF',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: '0px 2px 6px #AAA'
                        }}>
                        <div
                            style={{
                                height: '8px',
                                width: '5px',
                                backgroundColor: isDragged ? '#000' : '#CCC'
                            }}
                        />
                    </div>
                )}
            />
            <output className='align-content-between d-flex justify-content-between mt-3 w-100'>
                <input
                    type='number'
                    min={MIN}
                    step={STEP}
                    max={MAX}
                    value={values[0]}
                    onChange={(e) =>
                        setValues([parseFloat(e.target.value), values[1]])
                    }
                    className='form-control'
                />
                <span
                    className='d-flex justify-content-center w-50'
                    style={{ lineHeight: '32px' }}>
                    -
                </span>
                <input
                    type='number'
                    min={MIN}
                    step={STEP}
                    max={MAX}
                    value={values[1]}
                    onChange={(e) =>
                        setValues([values[0], parseFloat(e.target.value)])
                    }
                    className='form-control'
                />
            </output>
        </div>
    );
}
