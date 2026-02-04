export function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return ( 
        <main className={`float-end transition-all duration-400 ease-in-out w-full `}>
            <div className="m-auto">
                {children} 
            </div> 
        </main>
     );
}

