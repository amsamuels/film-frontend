import React from 'react';

export const Select = ({ options = [], label, ...rest }) => {
  const content = (
    <>
      <label
        htmlFor={rest.id}
        className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
      >
        {label}
      </label>
      <select
        className='block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </>
  );

  return content;
};

export default Select;
