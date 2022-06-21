import React, { useState, FC } from 'react'
import { ScrollView } from 'react-native'
import {
  Modal,
  Portal,
  Button,
  TextInput,
  List,
  TouchableRipple,
} from 'react-native-paper'
import { CategoryType, ExpenseType } from '../types'

interface AddExpProps {
  visible: boolean
  setVisible: (visible: boolean) => void
  setExpences: React.Dispatch<React.SetStateAction<ExpenseType[]>>
}
const defaultExpen = {
  title: '',
  value: 0,
  category: CategoryType.Category,
}

export const AddExp: FC<AddExpProps> = ({
  visible,
  setVisible,
  setExpences,
}) => {
  const [AddExpen, setAddExpen] = useState<ExpenseType>(defaultExpen)
  const [expanded, setExpanded] = useState(false)

  const hideModal = () => {
    setVisible(false)
    setAddExpen(defaultExpen)
  }
  const handlePress = () => setExpanded(!expanded)
  const handlePressCat = (type: CategoryType) => {
    setAddExpen((prev) => {
      return { ...prev, category: type }
    })
    handlePress()
  }
  const containerStyle = { backgroundColor: 'white', padding: 20 }
  const handlePressButton = () => {
    const newExp = { ...AddExpen, date: new Date() }
    setExpences((prev) => [...prev, newExp])
    hideModal()
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <TextInput
          style={{ marginTop: 20 }}
          autoComplete={false}
          label='Title'
          value={AddExpen.title}
          onChangeText={(text) =>
            setAddExpen((prev) => {
              return { ...prev, title: text }
            })
          }
        />
        <TextInput
          keyboardType='number-pad'
          autoComplete={false}
          label='Amount'
          value={String(AddExpen.value)}
          onChangeText={(text) =>
            setAddExpen((prev) => {
              return { ...prev, value: Number(text) }
            })
          }
        />

        <List.Section>
          <List.Accordion
            title={AddExpen.category}
            expanded={expanded}
            onPress={handlePress}
          >
            <ScrollView style={{ height: 200 }}>
              {Object.values(CategoryType).map((type) => {
                return (
                  <TouchableRipple
                    onPress={() => handlePressCat(type)}
                    key={type}
                  >
                    <List.Item title={type} />
                  </TouchableRipple>
                )
              })}
            </ScrollView>
          </List.Accordion>
        </List.Section>
        <Button
          mode='contained'
          style={{ margin: 30 }}
          onPress={handlePressButton}
        >
          Add Expence
        </Button>
      </Modal>
    </Portal>
  )
}
