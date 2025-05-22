export default function Badge({ children, className }) {
    return (
        <span
            className={`inline-flex items-center justify-center px-3 py-1 text-xs font-extrabold rounded-full border border-zinc-600 ${className}`}
        >
            {children}
        </span>
    );
}