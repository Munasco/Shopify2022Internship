import "./styles.scss";
import Image from "./image";
import DatePicker from "react-datepicker";
import { useState, createContext, memo } from "react";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
export const LoadContext = createContext();

const App = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isLoaded, setIsLoaded] = useState(false);
  const handleChangeRaw = (date) => {
    date.currentTarget.value = moment(date.currentTarget.value).format(
      "MM/DD/YYYY"
    );
  };
  return (
    <LoadContext.Provider
      value={{ loaded: isLoaded, setLoadState: setIsLoaded }}
    >
      <div className="App">
        <header className="self-start text-white text-lg m-4">
          <h2 className="">
            Astronomic Image of the day from the following days:
          </h2>
          <div className="flex flex-wrap">
            <h1 className="inline-block text-red-500">StartDate: </h1>
            <DatePicker
              className=" inline bg-gray-500"
              selected={startDate}
              maxDate={endDate}
              onChangeRaw={(e) => handleChangeRaw(e)}
              onChange={(date) => {
                setIsLoaded(false);
                setStartDate(date);
              }}
            />
          </div>
          <div className="flex flex-wrap">
            <h1 className="text-red-500">EndDate: </h1>
            <DatePicker
              className="ml-1 bg-gray-500 flex-shrink"
              selected={endDate}
              maxDate={new Date()}
              minDate={startDate}
              onChange={(date) => {
                setIsLoaded(false);
                setEndDate(date);
              }}
            />
          </div>
        </header>
        <Image startDate={startDate} endDate={endDate} />
      </div>
    </LoadContext.Provider>
  );
};

export default memo(App);
