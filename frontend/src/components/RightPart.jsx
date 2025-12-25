export default function RightPart()
{
    return  <div className="hidden md:flex w-1/2 items-center justify-center bg-blue-600 text-white px-10">
    <div className="text-center">
      <h2 className="text-4xl font-bold mb-4">Stay Organized!</h2>
      <p className="text-lg">
        Keep track of your daily tasks and never miss a deadline again. Your productivity starts here. 🚀
      </p>
      {/* Optional: Add an illustration or icon */}
      <div className="mt-8">
        <img
          src="https://images.pexels.com/photos/3832031/pexels-photo-3832031.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Todo Illustration"
          className="w-64 mx-auto"
        />
      </div>
    </div>
  </div>
}