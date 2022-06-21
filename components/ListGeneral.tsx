import React, { useState } from 'react'
import { List } from 'react-native-paper'
import { Text, ScrollView, View } from 'react-native'
import { CategoryType, ExpenseType } from '../types'
import { Detail } from './Detail'

interface ListGeneralProps {
  expences: ExpenseType[]
  currentMonth: number
  categories: string[]
  setExpences: (expences: ExpenseType[]) => void
}

function ListGeneral({
  expences,
  currentMonth,
  categories,
  setExpences,
}: ListGeneralProps) {
  const [detailVisible, setDetailVisible] = useState(false)
  const [currentExp, setCurrentExp] = useState({
    title: '',
    value: 0,
    category: CategoryType.Category,
  })
  const handlePressCurrent = (exp: ExpenseType) => {
    setDetailVisible(true)
    setCurrentExp(exp)
  }

  const deleteCurrent = () => {
    const newArr = expences.filter((exp) => exp != currentExp)
    setExpences(newArr)
  }
  return (
    <View>
      <ScrollView>
        <List.Section>
          {categories
            .filter((cate) => expences.find((expen) => expen.category == cate))
            .map((categ) => (
              <List.Accordion
                title={categ}
                key={categ}
                right={() => (
                  <Text>
                    $
                    {expences
                      .filter((expe) => expe.category === categ)
                      .map((sum) => sum.value)
                      .reduce((acum, curr) => acum + curr)}
                  </Text>
                )}
              >
                {expences
                  .filter((ex) => ex.category === categ)
                  .map((e) => (
                    <List.Item
                      title={e.title}
                      key={e.title + e.category}
                      right={() => (
                        <Text>
                          ${e.value}
                          {/* <List.Icon icon={'delete'} />
                          <List.Icon icon={'pencil'} /> */}
                        </Text>
                      )}
                      // description={e.date?.getDate()}
                      onPress={() => handlePressCurrent(e)}
                    />
                  ))}
                <Detail
                  detailVisible={detailVisible}
                  setDetailVisible={setDetailVisible}
                  currentExp={currentExp}
                  deleteCurrent={deleteCurrent}
                />
              </List.Accordion>
            ))}
        </List.Section>
      </ScrollView>
    </View>
  )
}

export default ListGeneral
