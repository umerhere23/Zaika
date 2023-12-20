import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal, Button, Form } from "react-bootstrap";
import {
  sendMealsToBackend,
  fetchMealsFromBackend,
  deleteMealFromBackend,
} from "../../Service/api";

const localizer = momentLocalizer(moment);

const MealPlanner = () => {
  const [meals, setMeals] = useState([]);
  const [fetchedMeals, setFetchedMeals] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mealType, setMealType] = useState("Breakfast");
  const [mealDescription, setMealDescription] = useState("");
  const [EditMode, setEditModes] = useState(false);
  const [mealToEdit, setMealToEdit] = useState(null);
  const userName = "User2";

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setShowModal(true);
    setEditModes(false);
    setMealToEdit(null);
  };

  const saveMeal = () => {
    const newMeal = {
      title: `${mealType} - ${mealDescription}`,
      start: selectedDate,
      end: selectedDate,
      Username: "User2",
    };
    setMeals((prevMeals) => {
      if (EditMode && mealToEdit) {
        return prevMeals.map((meal) => (meal === mealToEdit ? newMeal : meal));
      } else {
        return [...prevMeals, newMeal];
      }
    });

    setShowModal(false);
  };
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const fetchedMeals = await fetchMealsFromBackend();
        setMeals(fetchedMeals);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchMeals();
  }, []);
  const handleSaveMealPlan = async (e) => {
    e.preventDefault();

    console.log("Meals to be sent:", meals);

    try {
      await sendMealsToBackend(meals);

      console.log("Meal plan saved successfully");
    } catch (error) {
      console.error("Error saving meal plan:", error);
    }
  };
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const fetchedMeals = await fetchMealsFromBackend(userName);
        setMeals(fetchedMeals);
        console.log(setMeals);
        setMeals(fetchedMeals);
        setFetchedMeals(fetchedMeals);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchMeals();
  }, [userName]);
  const handleDeleteMeal = async (mealToDeleteId) => {
    try {
      console.log("Deleting Meal ID:", mealToDeleteId);

      await deleteMealFromBackend(mealToDeleteId);

      const updatedMeals = meals.filter((meal) => meal._id !== mealToDeleteId);
      setMeals(updatedMeals);

      console.log("Meal deleted successfully");
    } catch (error) {
      console.error("Error deleting meal:", error);
    }
  };

  const handleEditMeal = (mealToEdit) => {
    setMealType("");
    setMealDescription(mealToEdit.title);
    setEditModes(true);
    setMealToEdit(mealToEdit);
    setSelectedDate(mealToEdit.start);
    setShowModal(true);
  };

  const customCellClass = "custom-calendar-cell";

  return (
    <div className="container mt-4">
      <style>
        {`.${customCellClass} {
          // width: 250px;
          // height: 250px;
        }`}
      </style>
      <h1>
        Fetched Meal IDs: {fetchedMeals.map((meal) => meal._id).join(", ")}
      </h1>

      <Calendar
        localizer={localizer}
        events={meals}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelectSlot}
        eventPropGetter={(event, start, end, isSelected) => {
          const style = {
            backgroundColor: "#3174ad",
          };
          return {
            style,
          };
        }}
        components={{
          event: ({ event }) => (
            <div>
              <div>{event.title}</div>
              <Button
                variant="danger"
                onClick={() => handleDeleteMeal(event._id)}
              >
                Delete
              </Button>
              <Button variant="info" onClick={() => handleEditMeal(event)}>
                Edit
              </Button>
            </div>
          ),
          timeSlotWrapper: ({ children }) => (
            <div className={customCellClass}>{children}</div>
          ),
        }}
      />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{EditMode ? "Edit Meal" : "Add Meal"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formMealType">
              <Form.Label>Meal Type</Form.Label>
              <Form.Control
                as="select"
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
              >
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formMealDescription">
              <Form.Label>Meal Description</Form.Label>
              <Form.Control
                type="text"
                value={mealDescription}
                onChange={(e) => setMealDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={saveMeal}>
            {EditMode ? "Save Changes" : "Save Meal"}
          </Button>
        </Modal.Footer>
      </Modal>
      <Button variant="success" onClick={handleSaveMealPlan} className="mt-3">
        Save Meal Plan
      </Button>
    </div>
  );
};

export default MealPlanner;
