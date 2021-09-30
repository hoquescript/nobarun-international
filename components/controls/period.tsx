import React, { useState, useEffect, useRef, forwardRef } from 'react';

import { DateRangePicker } from 'react-date-range';
import { format, sub } from 'date-fns';
// import styled from 'styled-components';

import styles from './period.module.scss';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

type ISelectionRange = { startDate: Date; endDate: Date; key: string };
interface TimePeriodProps {
  period: string;
  setPeriod: React.Dispatch<React.SetStateAction<string>>;
  selectionRange: any;
  setSelectionRange: any;
}

const TimePeriod = React.memo((props: TimePeriodProps) => {
  const { period, setPeriod, selectionRange, setSelectionRange } = props;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timePeriod, setTimePeriod] = useState('Last 6 Months');
  const [screenWidth, setScreenWidth] = useState(1920);

  useEffect(() => {
    setScreenWidth(window.screen.width);
  }, [setScreenWidth]);

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current?.contains(event.target)) {
        setShowDatePicker(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  const showFormattedDate = (range) => {
    const startDate = format(range.startDate, 'yyyy-MM-dd');
    const endDate = format(range.endDate, 'yyyy-MM-dd');
    return `${startDate} - ${endDate}`;
  };

  const handleDateChange = (item) => {
    setSelectionRange([item.Periods]);
    setPeriod(showFormattedDate(item.Periods));
  };

  const handleDefinedRange = (label: string) => {
    setTimePeriod(label);
    if (label !== 'Custom Range') setShowDatePicker(false);
  };
  return (
    <div style={{ position: 'relative' }} ref={ref}>
      <input
        className={`custom-input ${styles.period__input}`}
        type="text"
        id="dateRange"
        placeholder="Date"
        autoComplete="off"
        value={period}
        onChange={(e) => {
          setTimePeriod('Custom Range');
          setPeriod(e.target.value);
        }}
        onClick={() => setShowDatePicker(true)}
      />
      {showDatePicker && (
        <div
          className={`${styles.period__picker} ${
            timePeriod === 'Custom Range' && styles.period__picker_active
          }`}
        >
          <DateRangePicker
            showDateDisplay={screenWidth > 465}
            className={timePeriod === 'Custom Range' ? 'custom-date-range' : ''}
            ranges={selectionRange}
            direction={screenWidth > 800 ? 'horizontal' : 'vertical'}
            onChange={handleDateChange}
            showSelectionPreview
            moveRangeOnFirstSelection={false}
            months={2}
            renderStaticRangeLabel={({ label }) => (
              <button
                className={`
                  custom-date-picker-range-btn 
                  ${styles.period__picker_button} 
                  ${
                    timePeriod === label && styles.period__picker_button_active
                  }`}
                type="button"
                onClick={() => handleDefinedRange(label)}
              >
                {label}
              </button>
            )}
            staticRanges={[
              {
                label: 'Last 7 Days',
                hasCustomRendering: true,
                range: () => ({
                  startDate: sub(new Date(), { weeks: 1 }),
                  endDate: new Date(),
                }),
                isSelected: () => false,
              },
              {
                label: 'Last Month',
                hasCustomRendering: true,
                range: () => ({
                  startDate: sub(new Date(), { months: 1 }),
                  endDate: new Date(),
                }),
                isSelected: () => false,
              },
              {
                label: 'Last 2 Months',
                hasCustomRendering: true,
                range: () => ({
                  startDate: sub(new Date(), { months: 2 }),
                  endDate: new Date(),
                }),
                isSelected: () => false,
              },
              {
                label: 'Last 3 Months',
                hasCustomRendering: true,
                range: () => ({
                  startDate: sub(new Date(), { months: 3 }),
                  endDate: new Date(),
                }),
                isSelected: () => false,
              },
              {
                label: 'Last 6 Months',
                hasCustomRendering: true,
                range: () => ({
                  startDate: sub(new Date(), { months: 6 }),
                  endDate: new Date(),
                }),
                isSelected: () => false,
              },
              {
                label: 'Last 1 Year',
                hasCustomRendering: true,
                range: () => ({
                  startDate: sub(new Date(), { years: 1 }),
                  endDate: new Date(),
                }),
                isSelected: () => false,
              },
              {
                label: 'Last 2 Year',
                hasCustomRendering: true,
                range: () => ({
                  startDate: sub(new Date(), { years: 2 }),
                  endDate: new Date(),
                }),
                isSelected: () => false,
              },
              {
                label: 'Last 5 Year',
                hasCustomRendering: true,
                range: () => ({
                  startDate: sub(new Date(), { years: 5 }),
                  endDate: new Date(),
                }),
                isSelected: () => false,
              },
              {
                label: 'Last 10 Year',
                hasCustomRendering: true,
                range: () => ({
                  startDate: sub(new Date(), { years: 10 }),
                  endDate: new Date(),
                }),
                isSelected: () => false,
              },
              {
                label: 'Max',
                hasCustomRendering: true,
                range: () => ({
                  startDate: sub(new Date(), { years: 20 }),
                  endDate: new Date(),
                }),
                isSelected: () => false,
              },
              {
                label: 'Custom Range',
                hasCustomRendering: true,
                range: () => ({
                  startDate: sub(new Date(), { days: 7 }),
                  endDate: new Date(),
                }),
                isSelected: () => false,
              },
            ]}
          />
        </div>
      )}
    </div>
  );
});
export default TimePeriod;
