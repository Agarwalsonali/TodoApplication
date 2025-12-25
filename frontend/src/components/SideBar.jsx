export default function SideBar()
{
    return  <div className="bg-amber-800 w-1/2 h-full flex flex-col justify-center items-center p-6">
    <div className="text-4xl font-bold text-white mb-6">
      <h1>Welcome to TodoMaster</h1>
    </div>
    <div className="text-3xl font-semibold text-white mb-6 text-center">
      <h2>Stay on top of your busy life with TodoMaster.</h2>
    </div>
    <div className="text-xl font-medium text-white text-center mb-6">
      <p>Join thousands of users who are achieving more every day.</p>
    </div>
    <div>
    <button className="bg-amber-500 text-white py-3 px-8 rounded-full text-lg mt-8">
      Get Started
    </button>
</div>
</div>

}