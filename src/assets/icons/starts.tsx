export const Star = ({ color }: { color?: string }) => {
    return (
        <svg width="22" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M5.5 0L6.73483 3.80041H10.7308L7.49799 6.14919L8.73282 9.94959L5.5 7.60081L2.26718 9.94959L3.50201 6.14919L0.269189 3.80041H4.26517L5.5 0Z"
                fill={color ? color : "#667eea"}
            />
        </svg>
    );
};
