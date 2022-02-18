import React, { useRef, useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import ListItem from './components/ListItem';
import Chart from './components/chart';
import { BottomSheetModalProvider, BottomSheetModal } from '@gorhom/bottom-sheet';
import { SAMPLE_DATA } from './assets/data/sampleData';


const ListHeader = () => (
  <>
     <View style={styles.titleWrapper}>
        <Text style={styles.largeTitle}>Markets</Text>
    </View>
        <View style={styles.divider} />
  </> 
)

export default function App() {
    const [selectedCoinData, setSelectedCoinData] = useState(null);

    const bottomSheetModalRef = useRef(null);

    const snapPoints = useMemo(() => ['40%'], []);

    const openModal = (item) => {
      setSelectedCoinData(item)
      bottomSheetModalRef.current.present();
    }

  return (
    <BottomSheetModalProvider>
    <SafeAreaView style={styles.container}>
     <FlatList 
        keyExtractor={(item) => item.id}
        data={SAMPLE_DATA}
        renderItem={({ item }) => (
          <ListItem 
            name={item.name} 
            symbol={item.symbol}   
            currentPrice={item.current_price}  
            priceChangePercentage7d={item.price_change_percentage_7d_in_currency} 
            logoUrl={item.image}
            onPress={() => openModal(item)}
          />
        )}
          ListHeaderComponent={<ListHeader />}
      />
    </SafeAreaView>

    <BottomSheetModal 
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      style={styles.bottomSheet}
    >
      { selectedCoinData ? (
    <Chart 
      currentPrice={setSelectedCoinData.current_price}
      logoUrl={setSelectedCoinData.image}
      name={setSelectedCoinData.name}
      symbol={setSelectedCoinData.symbol}
      priceChangePercentage7d={setSelectedCoinData.price_change_percentage_7d_in_currency}
      sparkline={selectedCoinData.sparkline_in_7d.price}
    />
      )
    : null}
    </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleWrapper: {
    marginTop: 30,
    paddingHorizontal: 16,
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#A9ABB1',
    marginHorizontal: 16,
    marginTop: 16,
  },
  bottomSheet: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
