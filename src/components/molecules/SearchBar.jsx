import { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '@/components/atoms/Input';
import ApperIcon from '@/components/ApperIcon';

const SearchBar = ({ 
  placeholder = 'Search...',
  onSearch,
  onClear,
  value = '',
  className = '' 
}) => {
  const [searchValue, setSearchValue] = useState(value);
  
  const handleSearch = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    onSearch?.(newValue);
  };
  
  const handleClear = () => {
    setSearchValue('');
    onClear?.();
    onSearch?.('');
  };
  
  return (
    <div className={`relative ${className}`}>
      <Input
        placeholder={placeholder}
        value={searchValue}
        onChange={handleSearch}
        leftIcon="Search"
        className="pr-10"
      />
      
      {searchValue && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ApperIcon name="X" size={18} />
        </motion.button>
      )}
    </div>
  );
};

export default SearchBar;