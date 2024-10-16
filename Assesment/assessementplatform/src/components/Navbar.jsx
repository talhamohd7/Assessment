import SageLogo from '../assets/SageLogo.svg'

const Navbar = () => {

  return (
    <div className='w-full p-6 border-b-2 border-t-0 border-solid border-gray-2 z-50' style={{display:'flex',justifyContent:'space-between'}}>
        <img src={SageLogo} alt="" />        
    </div>
  );
};

export default Navbar;

