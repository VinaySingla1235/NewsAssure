export default function Card({children,noPadding}){
    let classes='shadow-md shadow-gray-300 rounded-md bg-white mb-5';
    if(noPadding!==true){
        classes += ' p-4';
        
    }
    return (
        <div className={classes}>
            {children}
            </div>
    );
}