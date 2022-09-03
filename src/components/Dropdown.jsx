import React, { memo} from "react";
import "./Dropdown.styles.css";

const Dropdown = ({
  data,
  name,
  isDropdownClick,
  selected,
  handleQuery,
  query,
  cursor,
  handleKeyDown,
  scrollRef,
  handleItemClick,
  handleDropdown,
  parentScrollRef
}) => {

  const handleInputKeyDown = (e) => {
      if (e.keyCode === 40) {
        e.target.blur();
        parentScrollRef.current.children[cursor].focus();
      }
  }

  return (
    <div style={{ textAlign: "left" }}>
      <label htmlFor={name}>{name}</label>
      <div
        className="select-container"      >
        <div
          className="dropdown-btn"
          id={name}
          onClick={() => handleDropdown(name)}
        >
          {selected || "- Select -"}
        </div>
        <div
          className={`dropdown-content-container ${
            isDropdownClick && "active"
          }`}
        >
          <div className="search-content">
            <input
              type="search"
              placeholder="Type search here"
              autoComplete="off"
              name={name}
              value={query}
              onChange={handleQuery}
              onKeyDown={handleInputKeyDown}
            />
          </div>
          <div className="item-container"
            ref={parentScrollRef}
          >
            {data
              .filter((item) =>
                (item.name || item).toLowerCase().includes(query)
              )
              .map((item, index) => (
                <div
                  className={` dropdown-content ${
                    ((item.name || item) === selected || cursor === index) &&
                    "selected"
                  }`}
                  onClick={(e) => handleItemClick(e, name, index)}
                  onKeyDown={(e) => handleKeyDown(e, name)}
                  tabIndex ={0}
                  ref={scrollRef}
                    >
                  {item.name || item}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Dropdown);
