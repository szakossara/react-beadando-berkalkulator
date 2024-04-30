import React, { useState } from 'react';
import Slider from './components/Slider';
import Button from './components/Button';
import Checkbox from './components/Checkbox';
import DateInput from './components/DateInput';
import NumberInput from './components/NumberInput';
import Modal from 'react-modal';
import SalaryButton from './components/SalaryButton';
import { NumericFormat } from 'react-number-format';

const SalaryCalculator = () => {
  const [grossSalary, setGrossSalary] = useState(0);
  const [netSalary, setNetSalary] = useState(0);
  const [isUnder25, setIsUnder25] = useState(false);
  const [isNewlyMarried, setIsNewlyMarried] = useState(false);
  const [dependents, setDependents] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [personalDiscount, setpersonalDiscount] = useState(false)

  //const [people, setPeople] = useState(members)
  //const [formState, setFormState] = useState(person)

    function calculateNetSalary() {
    let netS = grossSalary;
    let tax = 0;
  
    let SZJA = 0.15 * grossSalary;
    const TB = 0.185 * grossSalary;

    tax += TB;
    tax += SZJA;
  
    if (isUnder25 && grossSalary <= 499952) {
      tax -= SZJA;
    }else if(isUnder25 && grossSalary>499952) {
      const extra = grossSalary-499952;
      SZJA = 0.15 * extra;
      tax -= SZJA;
    }
  
    if (isNewlyMarried && isWithinTwoYears(selectedDate)) {
      netS += 5000;
    }


    if (netS < 0) {
      netS = 0;
    }

    if(personalDiscount) tax-=77300;
    if(tax < 0) tax = 0;
    
    netS-=tax;

    return netS;
  };

  const handleGrossSalaryChange = (value) => {
    setGrossSalary(value);
    calculateNetSalary();
  };

  const handleUnder25Change = (checked) => {
    setIsUnder25(checked);
    calculateNetSalary();
  };

  const handleNewlyMarriedChange = (checked) => {
    setIsNewlyMarried(checked);
    calculateNetSalary();
  };

  const handleDependentsChange = (value) => {
    setDependents(value);
    calculateNetSalary();
  };

  const handleDateSubmit = (date) => {
    setSelectedDate(date);
    setModalOpen(false);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const isWithinTwoYears = (date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    const twoYearsAgo = new Date(today.getFullYear() - 2, today.getMonth(), today.getDate());
    return selectedDate.getTime() >= twoYearsAgo.getTime();
  };

  return (
    <div className='flex items-center justify-center mt-24'><div className="border-2 rounded-lg bg-secondary-content flex flex-col items-center justify-center max-w-fit">
      <h1 className="text-2xl font-bold mb-4">Salary Calculator</h1>
      <NumberInput label="Gross Salary" value={grossSalary} onC={setGrossSalary} calc={calculateNetSalary} />
      <Slider value={+grossSalary} onChange={handleGrossSalaryChange} />
      <div className="grid grid-cols-4 gap-8 mt-5 pl-8 pr-8 pb-8 mx-8">
        <SalaryButton SalaryValue={grossSalary} setSalaryValue={handleGrossSalaryChange} changeAmount={0.99} text="-1%" />
        <SalaryButton SalaryValue={grossSalary} setSalaryValue={handleGrossSalaryChange} changeAmount={0.95} text="-5%" />
        <SalaryButton SalaryValue={grossSalary} setSalaryValue={handleGrossSalaryChange} changeAmount={1.01} text="+1%" />
        <SalaryButton SalaryValue={grossSalary} setSalaryValue={handleGrossSalaryChange} changeAmount={1.05} text="+5%" />
      </div>
      <Checkbox label="Under 25" onChange={handleUnder25Change} />
      {/* {isNewlyMarried && (
        <DateInput label="Marriage Date" value={marriageDate} onChange={handleMarriageDateChange} />
      )}*/}
      <Checkbox label="Newly Married" onChange={handleNewlyMarriedChange} />
      {isNewlyMarried && (
        <button onClick={() => setModalOpen(true)}>Add Date</button>
      )}
      {selectedDate && isNewlyMarried &&(
        <p>{isWithinTwoYears(selectedDate) ? 'Jogosult' : 'Nem jogosult'}</p>
      )}

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Select a Date"
      >
        <button onClick={() => setModalOpen(false)}>Close</button>
        <p>Select a date:</p>
        <input type="date" onChange={(e) => handleDateSubmit(e.target.value)} />
      </Modal>

      <Checkbox label="Személyi adókedvezmény" onChange={setpersonalDiscount} />
      <div className="mt-4">Net Salary: <NumericFormat value={calculateNetSalary().toFixed(0)} displayType={'text'} thousandSeparator={" "} suffix={' Ft'} /></div>
    </div></div>
  );
};

export default SalaryCalculator;