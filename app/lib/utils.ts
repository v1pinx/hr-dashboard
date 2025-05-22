export function getPerformanceColor(rating : number){
    if (rating >= 4.5) {
        return "bg-green-500 text-white";
    } else if (rating >= 3.5) {
        return "bg-yellow-500 text-white";
    } else {
        return "bg-red-500 text-white";
    }
}