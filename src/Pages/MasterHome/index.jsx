// import Login from "";
// import Index from "../components";

import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Background = styled.div`
  background-image: url('/group-10.svg');
`;
function MasterHome() {
  return (
    <Background className=" w-98vw h-screen">
      <img src="/logo.svg" className="w-36 h-38 ml-28 pt-8" alt="" />

      <div className="flex flex-col  space-y-8 pt-12 px-6">
        <button className="rounded-full px-6 py-4 bg-violet-400 text-white">
          <Link to={'/master/sign'}>Sign Up</Link>
        </button>
        <button className="rounded-full px-6 py-4 bg-violet-400 text-white">
          <Link to={'/master/login'}>Login</Link>
        </button>{' '}
      </div>
    </Background>
  );
}

export default MasterHome;
