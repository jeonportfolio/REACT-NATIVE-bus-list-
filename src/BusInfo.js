import { View,Text } from "react-native"
import BookmarkButton from "./BookmarkButton"
import { COLOR } from "./color"
import AlarmButton from "./AlarmButton"
import NextBusInfo from "./NextBusInfo"

export default ({
    NEWCOLOR,
    isBookmarked,
    onPressBookmark,
    num,
    numColor,
    directionDescription,
    processedNextBusInfos,

}) => {
   
    return (
        <View style= {{ flexDirection:"row" , height:70, backgroundColor: NEWCOLOR.WHITE_BLACK }}>
            <View style={{ 
                flex: 0.8, 
                flexDirection:"row", 
                alignItems:"center"
            }}>
                {/* 북마크 */}
                <BookmarkButton
                    NEWCOLOR={NEWCOLOR}
                    size={20}
                    isBookmarked={isBookmarked}
                    onPress={onPressBookmark}
                    style={{ paddingHorizontal: 10 }}
                />
                {/* 버스번호, 방향 */}
                <View style={{flex:1}}>
                    <Text style={{ color: numColor, fontSize: 20}}>{num}</Text>
                    <Text style={{ fontSize:13, color: COLOR.GRAY_3, marginRight:5 }}>{directionDescription}</Text>
                </View>
                
            </View>
            <View style={{ flex:1, flexDirection: "row", alignContent:"center", marginTop:5}}>
                {/* 남은시간/ n번째 전 / 여유 */}
                <View style={{ flex:1 }}>
                    {processedNextBusInfos.map( (info, index) => (
                             <NextBusInfo
                                NEWCOLOR={NEWCOLOR}
                                key={`next-bus-info-${index}`}
                                 hasInfo={info.hasInfo}
                                 remainTimeText={info.remainedTimeText}
                                 numOfRemainedStops={info.numOfRemainedStops}
                                 seatStatusText={info.seatStatusText}
                            />
                    ))}
                
                </View>
                <AlarmButton NEWCOLOR= {NEWCOLOR} onPress={() => {}} style={{paddingHorizontal: 15}}/>
            </View>
        </View>
    )
}