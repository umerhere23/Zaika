import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { sendMealsToBackend } from '../../Service/api';

const localizer = momentLocalizer(moment);

const MealPlanner = () => {
  const [meals, setMeals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mealType, setMealType] = useState('Breakfast');
  const [mealDescription, setMealDescription] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [mealToEdit, setMealToEdit] = useState(null);

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setShowModal(true);
    setEditMode(false);
    setMealToEdit(null);
  };

  const saveMeal = () => {
    const newMeal = {
      title: `${mealType} - ${mealDescription}`,
      start: selectedDate,
      end: selectedDate,
    };
  
    setMeals((prevMeals) => {
      if (editMode && mealToEdit) {
        return prevMeals.map((meal) => (meal === mealToEdit ? newMeal : meal));
      } else {
        return [...prevMeals, newMeal];
      }
    });
  
    setShowModal(false);
  };
  

  const handleSaveMealPlan= async (e) => {
    e.preventDefault();

    await   sendMealsToBackend(meals);
    console.log(meals)
  };

  const handleDeleteMeal = (mealToDelete) => {
    const updatedMeals = meals.filter((meal) => meal !== mealToDelete);
    setMeals(updatedMeals);
  };

  const handleEditMeal = (mealToEdit) => {
    setMealType(''); // Clear the meal type (you can set it based on mealToEdit)
    setMealDescription(mealToEdit.title); // Set the meal description for editing
    setEditMode(true);
    setMealToEdit(mealToEdit);
    setSelectedDate(mealToEdit.start);
    setShowModal(true);
  };

  // Define a custom CSS class for the calendar cells
  const customCellClass = 'custom-calendar-cell';

  return (
    <div className="container mt-4">
      <style>
        {`.${customCellClass} {
          width: 250px; 
          height: 250px; 
        }`}
      </style>

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
            backgroundColor: '#3174ad', 
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
                onClick={() => handleDeleteMeal(event)}
              >
                Delete
              </Button>
              <Button
                variant="info"
                onClick={() => handleEditMeal(event)}
              >
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
          <Modal.Title>{editMode ? 'Edit Meal' : 'Add Meal'}</Modal.Title>
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
            {editMode ? 'Save Changes' : 'Save Meal'}
          </Button>
        </Modal.Footer>
      </Modal>

      <Button
        variant="success"
        onClick={handleSaveMealPlan}
        className="mt-3"
      >
        Save Meal Plan
      </Button>
    </div>
  );
};

export default MealPlanner;
