import React from "react";
import "./ServicesIcons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCarCrash,
  faCarOn,
  faPlug,
  faHammer,
  faShirt,
  faBroomBall,
  faFan,
  faTree,
  faTruck,
  faOilCan,
  faMobileScreen,
  faFaucetDrip,
} from "@fortawesome/free-solid-svg-icons";
const ServicesIcons = ({toggleSearchMenu, selectedCategory, setSelectedCategory}) => {


    const handleCategoryChange = (event) => {
        const selected = event.target.value;
        setSelectedCategory(selected);
        toggleSearchMenu(selected);
        //navigate(`/business/search?category=${selected}`);
      };
      
  return (
    <div className="services-line">
      <label
        className={`service-icon ${
          selectedCategory === "Auto Repair" ? "clicked" : ""
        }`}
      >
        <input
          type="radio"
          name="category"
          value="Auto Repair"
          checked={selectedCategory === "Auto Repair"}
          onChange={handleCategoryChange}
        />
        <FontAwesomeIcon icon={faCarCrash} size="lg" />
        <p>Auto Repair</p>
      </label>

      <label
        className={`service-icon ${
          selectedCategory === "Electricians" ? "clicked" : ""
        }`}
      >
        <input
          type="radio"
          name="category"
          value="Electricians"
          checked={selectedCategory === "Electricians"}
          onChange={handleCategoryChange}
        />
        <FontAwesomeIcon icon={faPlug} size="lg" />
        <p>Electricians</p>
      </label>
      <label
        className={`service-icon ${
          selectedCategory === "Contractors" ? "clicked" : ""
        }`}
      >
        <input
          type="radio"
          name="category"
          value="Contractors"
          checked={selectedCategory === "Contractors"}
          onChange={handleCategoryChange}
        />
        <FontAwesomeIcon icon={faHammer} size="lg" />
        <p>Contractors</p>
      </label>
      <label
        className={`service-icon ${
          selectedCategory === "Dry Cleaning" ? "clicked" : ""
        }`}
      >
        <input
          type="radio"
          name="category"
          value="Dry Cleaning"
          checked={selectedCategory === "Dry Cleaning"}
          onChange={handleCategoryChange}
        />
        <FontAwesomeIcon icon={faShirt} size="lg" />
        <p>Dry Cleaning</p>
      </label>
      <label
        className={`service-icon ${
          selectedCategory === "Home Cleaners" ? "clicked" : ""
        }`}
      >
        <input
          type="radio"
          name="category"
          value="Home Cleaners"
          checked={selectedCategory === "Home Cleaners"}
          onChange={handleCategoryChange}
        />
        <FontAwesomeIcon icon={faBroomBall} size="lg" />
        <p>Home Cleaners</p>
      </label>
      <label
        className={`service-icon ${
          selectedCategory === "HVAC" ? "clicked" : ""
        }`}
      >
        <input
          type="radio"
          name="category"
          value="HVAC"
          checked={selectedCategory === "HVAC"}
          onChange={handleCategoryChange}
        />
        <FontAwesomeIcon icon={faFan} size="lg" />
        <p>HVAC</p>
      </label>
      <label
        className={`service-icon ${
          selectedCategory === "Landscaping" ? "clicked" : ""
        }`}
      >
        <input
          type="radio"
          name="category"
          value="Landscaping"
          checked={selectedCategory === "Landscaping"}
          onChange={handleCategoryChange}
        />
        <FontAwesomeIcon icon={faTree} size="lg" />
        <p>Landscaping</p>
      </label>
      <label
        className={`service-icon ${
          selectedCategory === "Movers" ? "clicked" : ""
        }`}
      >
        <input
          type="radio"
          name="category"
          value="Movers"
          checked={selectedCategory === "Movers"}
          onChange={handleCategoryChange}
        />
        <FontAwesomeIcon icon={faTruck} size="lg" />
        <p>Movers</p>
      </label>
      <label
        className={`service-icon ${
          selectedCategory === "Oil Change" ? "clicked" : ""
        }`}
      >
        <input
          type="radio"
          name="category"
          value="Oil Change"
          checked={selectedCategory === "Oil Change"}
          onChange={handleCategoryChange}
        />
        <FontAwesomeIcon icon={faOilCan} size="lg" />
        <p>Oil Change</p>
      </label>
      <label
        className={`service-icon ${
          selectedCategory === "Phone Repair" ? "clicked" : ""
        }`}
      >
        <input
          type="radio"
          name="category"
          value="Phone Repair"
          checked={selectedCategory === "Phone Repair"}
          onChange={handleCategoryChange}
        />
        <FontAwesomeIcon icon={faMobileScreen} size="lg" />
        <p>Phone Repair</p>
      </label>
      <label
        className={`service-icon ${
          selectedCategory === "Plumbers" ? "clicked" : ""
        }`}
      >
        <input
          type="radio"
          name="category"
          value="Plumbers"
          checked={selectedCategory === "Plumbers"}
          onChange={handleCategoryChange}
        />
        <FontAwesomeIcon icon={faFaucetDrip} size="lg" />
        <p>Plumbers</p>
      </label>
      <label
        className={`service-icon ${
          selectedCategory === "Car Wash" ? "clicked" : ""
        }`}
      >
        <input
          type="radio"
          name="category"
          value="Car Wash"
          checked={selectedCategory === "Car Wash"}
          onChange={handleCategoryChange}
        />
        <FontAwesomeIcon icon={faCarOn} size="lg" />
        <p>Car Wash</p>
      </label>
    </div>
  );
};
export default ServicesIcons;
