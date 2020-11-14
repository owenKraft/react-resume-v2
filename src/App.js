import './App.css';
import Banner from './components/Banner';
import General from './components/General';
import Education from './components/Education';
import Experience from './components/Experience';
// import Hr from 'react-native-hr';

function App() {
  return (
    <div className="wrapper">
      <Banner />
      <General />
      {/* <Hr /> */}
      <Education />
      <Experience />
    </div>
  );
}

export default App;
