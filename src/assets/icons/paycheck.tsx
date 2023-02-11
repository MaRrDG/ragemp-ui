const PayCheck = ({ color }: { color?: string }) => {
    return (
        <svg id="svg" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0, 0, 400,400">
            <g id="svgg">
                <path id="path0" d="" stroke="none" fill={color ? color : "#040404"} fill-rule="evenodd"></path>
                <path id="path1" d="" stroke="none" fill={color ? color : "#080404"} fill-rule="evenodd"></path>
                <path id="path2" d="" stroke="none" fill={color ? color : "#080404"} fill-rule="evenodd"></path>
                <path id="path3" d="" stroke="none" fill={color ? color : "#080404"} fill-rule="evenodd"></path>
                <path id="path4" d="" stroke="none" fill={color ? color : "#080404"} fill-rule="evenodd"></path>
            </g>
        </svg>
    );
};

export default PayCheck;
