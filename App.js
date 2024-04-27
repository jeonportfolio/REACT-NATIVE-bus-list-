import { StatusBar } from 'expo-status-bar';
import dayjs from 'dayjs';
import { RefreshControl, SafeAreaView, SectionList, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import BusInfo from './src/BusInfo';
import { COLOR } from './src/color';
import { busStop, getBusNumColorByType, getRemainedTimeText, getSeatStatusText, getSections } from './src/data';
import { useEffect, useState } from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';
import Margin from './src/Margin';
import BookmarkButton from './src/BookmarkButton';
import { isDark, useTheme } from './src/use-theme';

const busStopBookmarkSize = 20;
const busStopBookmarkPadding = 6;

export default function App() {
  const sections = getSections(busStop.buses);
  const [ now, setNow ] = useState(dayjs());
  const [ refreshing, setRefreshing ] = useState(false);

  const { NEWCOLOR, isDark, toggleIsDark } = useTheme();

  const onPressBusStopBookmark = () => {
    
  }

  const ListHeaderComponent = () => (
    <View style={{ 
      backgroundColor: COLOR.GRAY_3,
      height: 220,
      justifyContent: "center", 
      alignItems:"center"
      }}>
      
      {/* 정류소 번호, 이름, 방향 */}
      <Margin height={10}/>
          <Text style= {{color: NEWCOLOR.WHITE_BLACK, fontSize: 13}}>{busStop.id}</Text>
          <Margin height={4}/>

          <Text style= {{color: NEWCOLOR.WHITE_BLACK, fontSize: 20}}>{busStop.name}</Text>
          <Margin height={4}/>

          <Text style= {{color: NEWCOLOR.GRAY_1_GRAY_2, fontSize: 14}}>{busStop.directionDescription}</Text>
          <Margin height={20}/>
          {/* 북마크 */}
          <BookmarkButton
             NEWCOLOR={NEWCOLOR}
             size={busStopBookmarkSize}
             isBookmarked = {busStop.isBookmarked}
             onPress = {onPressBusStopBookmark}
             style = {{ 
              borderWidth: 0.3, 
              borderColor: NEWCOLOR.GRAY_1_GRAY_4,
              borderRadius: (busStopBookmarkSize + busStopBookmarkPadding * 2) / 2,
              padding: 5,
            }}
             
          />
          <Margin height={25} /> 
          <Switch 
            value={isDark} 
            onValueChange={(v) => {
            console.log('changed switch value', v );
            toggleIsDark();
          }}/> 
    </View>
  )
  
  const renderSectionHeader = ({ section: {title}}) => (
    <View style ={{
        paddingLeft: 13, 
        paddingVertical: 3, 
        backgroundColor:NEWCOLOR.GRAY_1_GRAY_4,
        borderTopWidth:0.5 , 
        borderTopColor: NEWCOLOR.GRAY_2_GRAY_3,
        borderBottomColor: NEWCOLOR.GRAY_2_GRAY_3
      }} >
        <Text style = {{fontSize: 12, color: NEWCOLOR.GRAY_4_GRAY_1}}> {title} </Text>
    </View>
      
  );

  const renderItem = ({ item: bus }) => {
    const numColor = getBusNumColorByType(bus.type);
    const firstNextBusInfo = bus.nextBusInfos?.[0] ?? null; 
    const secondNextBusInfo = bus.nextBusInfos?.[1] ?? null;
    const newNextBusInfos =
      !firstNextBusInfo && !secondNextBusInfo
        ? [null]
        : [firstNextBusInfo, secondNextBusInfo];

    // if (bus.num === 2000) {
    //   console.log(bus.num, 'newNextBusInfos', newNextBusInfos); // TODO: 확인
    // }

    const processedNextBusInfos = newNextBusInfos.map((info) => {
      if (!info)
        return {
          hasInfo: false,
          remainedTimeText: "도착 정보 없음",
        };

      const { arrivalTime, numOfRemainedStops, numOfPassengers } = info;
      const remainedTimeText = getRemainedTimeText(now, arrivalTime);
      const seatStatusText = getSeatStatusText(bus.type, numOfPassengers);
      return {
        hasInfo: true,
        remainedTimeText,
        numOfRemainedStops,
        seatStatusText,
      };
    });
         
    

    return(
      <BusInfo
          NEWCOLOR={NEWCOLOR}
          isBookmarked={bus.isBookmarked}
          onPressBookmark={() => {}}
          num={bus.num}
          directionDescription={bus.directionDescription}
          numColor={numColor}
          processedNextBusInfos={processedNextBusInfos}
      />
    );
  };

  const ItemSeparatorComponent = () => {
    <View style = {{ width:"100%", height:1, backgroundColor: NEWCOLOR.GRAY_1_GRAY_4}}></View>
  }

  const ListFooterComponent = () => {
    <Margin height={30}/>
  }

  const onRefresh = () => {
      console.log('call onRefresh')
      setRefreshing (true);
  }

  useEffect( () => {
      if (refreshing){
        setTimeout(() => {
          setRefreshing(false);
          setNow(dayjs());
        },3000);
      } 
  },[refreshing])

  useEffect( () => {
       const interval = setInterval(() => {
         const newNow = dayjs()
         setNow(newNow);
       }, 1000); //1초마다 현재의 시간을 입력시키는 함
       return () => {
         clearInterval(interval);
       }
  }, []);

  return (
    <View style={{
      ...styles.container,
      backgroundColor: NEWCOLOR.WHITE_BLACK
    }}>
    
      {/* 뒤로가기와 홈아이콘 */}
     <View style={{ 
       backgroundColor: COLOR.GRAY_3,
        width:"100%" 
      }}>
      <SafeAreaView style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity style = {{ padding: 10 }}>
            <SimpleLineIcons name="arrow-left" size={20} color={NEWCOLOR.WHITE_BLACK} /> 
        </TouchableOpacity>
        <TouchableOpacity style = {{ padding: 10 }}>
            <SimpleLineIcons name="home" size={20} color={NEWCOLOR.WHITE_BLACK}/>
        </TouchableOpacity>
      </SafeAreaView>
      
      {/* 헤더 스크롤 이질감 방지 가상요소 */}
      <View style= {{ 
      
          position:"absolute", 
          width: "100%", 
          height: 500, 
          backgroundColor: COLOR.GRAY_3,
          zIndex: -1
      
      }}>  
      </View> 
    </View> 
      <SectionList
          style= {{ flex:1, width: "100%"}}
          sections={sections}
          ListHeaderComponent={ListHeaderComponent}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListFooterComponent={ListFooterComponent}
          refreshControl={
            <RefreshControl 
                  refreshing={refreshing} 
                  onRefresh={onRefresh}
                  // onRefresh= 스크롤의 y축의 값이 0에 도달했을때 실행되는 함수 
            />
          }
      />
    </View>
  );
}


//스크롤시 이질감 방지
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
