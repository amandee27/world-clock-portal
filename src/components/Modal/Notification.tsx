function Notification({ notification }: any) {
  return (
    <div className="flex justify-center px-4">
      <div className="bg-white/25 text-blue-200 px-4 text-sm py-2 animate-fadeIn rounded">
        {notification}
      </div>
    </div>
  );
}

export default Notification;
