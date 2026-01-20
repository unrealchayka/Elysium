function Bg() {
    return ( 
        <div 
            className="fixed z-35 inset-0 w-full h-full bg-transparent pointer-events-none"
            style={{
                boxShadow: `
                    inset 0 -50px 100px -40px rgb(100, 19, 205),
                    inset 0 -20px 30px -10px rgba(176, 208, 255, 0.5),
                    inset 0 -20px 20px -5px rgba(255, 255, 255, 0.3),
                    inset 0 -6px 8px -2px rgba(31, 130, 255, 0.15)
                `
            }}
        >
        </div>
     );
}

export default Bg;