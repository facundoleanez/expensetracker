import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import { AddExp } from './components/AddExp'
import ListGeneral from './components/ListGeneral'
import NavBarApp from './layout/NavBarApp'
import { data, months } from './constants'
import { ScrollableMain } from './layout/ScrollableMain'
import { CategoryType, ExpenseType } from './types'
import AsyncStorage from '@react-native-async-storage/async-storage'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    marginTop: 30,
    borderColor: 'black',
    borderWidth: 1,
    // justifyContent: 'center',
  },
})

export default function App() {
  const [expences, setExpences] = useState<ExpenseType[]>([])
  const [visible, setVisible] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [categories, setCategories] = useState(Object.values(CategoryType))

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      setExpences(jsonValue != null ? JSON.parse(jsonValue) : [])
      console.log(jsonValue)
    } catch (e) {
      // error reading value
    }
  }

  const storeData = async (value: ExpenseType[]) => {
    try {
      const jsonValue = JSON.stringify(value)

      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      console.log(e)
      // saving error
    }
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    storeData(expences)
  }, [expences])

  return (
    <PaperProvider>
      <View style={styles.container}>
        <NavBarApp NavTitle={currentMonth} setVisible={setVisible} />
        <AddExp
          visible={visible}
          setVisible={setVisible}
          setExpences={setExpences}
        />
        <ListGeneral
          setExpences={setExpences}
          expences={expences}
          currentMonth={currentMonth}
          categories={categories}
        />
        {/* <ScrollableMain data={months} /> */}
      </View>
    </PaperProvider>
  )
}
