import Navbar from "../components/Navbar";
import Form from "../components/Form";

const Login = () => {
  return (
    <>
      <Navbar />
      <div className="lg:flex lg:flex-col lg:items-center lg:justify-center lg:mt-44">
        <div className="m-2 lg:w-1/3">
          <Form />
        </div>
      </div>
    </>
  );
};

export default Login;
