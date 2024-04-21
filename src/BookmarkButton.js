import { TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { COLOR } from "./color";
import { useState } from "react";


const useBookmark = (intialIsBookmarked) => {
    const [isBookmarked, setIsBookmarked] = useState(intialIsBookmarked);
    const toggleIsBookmarked = () => setIsBookmarked(!isBookmarked);

    return {
        isBookmarked,
        toggleIsBookmarked,
    }
};



export default ({
    isBookmarked: isBookmarkedProp,
    onPress,
    style,
    size
}) => {
   
    const { isBookmarked, toggleIsBookmarked } = useBookmark(isBookmarkedProp);

   return (
        <TouchableOpacity style={style} onPress={() => {
            toggleIsBookmarked();
            onPress();
        }}>
            <Ionicons 
                name="star" 
                size={size} 
                color={isBookmarked ? COLOR.YELLOW : COLOR.GRAY_1} 
            />
        </TouchableOpacity>
    );
}