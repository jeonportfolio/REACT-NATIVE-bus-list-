import { View,Text } from "react-native"
import BookmarkButton from "./BookmarkButton"
import { COLOR } from "./color"
import AlarmButton from "./AlarmButton"
import NextBusINfo from "./NextBusINfo"

export default ({
    isBookmarked,
    onPressBookmark,
    num,
    numColor,
    directionDescription
}) => {
   
    return (
        <View style= {{ flexDirection:"row" }}>
            <View style={{ flex: 1, flexDirection:"row", alignItems:"center"}}>
                {/* 북마크 */}
                <BookmarkButton
                    isBookmarked={isBookmarked}
                    onPress={onPressBookmark}
                    style={{ paddingHorizontal: 10 }}
                />
                {/* 버스번호, 방향 */}
                <View style={{flex:1}}>
                    <Text style={{ color: numColor, fontSize: 20}}>{num}</Text>
                    <Text style={{ fontSize:13, color: COLOR.GRAY_3}}>{directionDescription}</Text>
                </View>
                
            </View>
            <View style={{ flex: 1, flexDirection: "row", alignContent:"center"}}>
                {/* 남은시간/ n번째 전 / 여유 */}
                <View style={{ flex:1 }}>
                   <NextBusINfo
                        hasInfo={true}
                        remainTimeText={"8분 0초"}
                        numOfRemainedStops={5}
                        seatStatusText={"여유"}
                   />
                    <NextBusINfo
                        hasInfo={false}
                        remainTimeText="도착정보 없음"
                   />
                </View>
                <AlarmButton onPress={() => {}} style={{paddingHorizontal: 15}}/>
            </View>
        </View>
    )
}