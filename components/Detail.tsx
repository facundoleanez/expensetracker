import React, { useState, FC } from 'react'
import { View, ScrollView } from 'react-native'
import {
  Modal,
  Portal,
  Button,
  TextInput,
  List,
  TouchableRipple,
  Text,
  Headline,
  Subheading,
} from 'react-native-paper'
import { CategoryType, ExpenseType } from '../types'

interface DetailProps {
  detailVisible: boolean
  setDetailVisible: (detailVisible: boolean) => void
  currentExp: ExpenseType
  deleteCurrent: () => void
}

export const Detail: FC<DetailProps> = ({
  detailVisible,
  setDetailVisible,
  currentExp,
  deleteCurrent,
}) => {
  const [sureVisible, setSureVisible] = useState(false)
  const [edit, setEdit] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 30,
    margin: 10,
  }
  const handlePressCat = (type: CategoryType) => {
    // setAddExpen((prev) => {
    //   return { ...prev, category: type }
    // })
    // handlePress()
  }
  const hideModal = () => {
    setDetailVisible(false)
  }
  const handlePressDelete = () => {
    deleteCurrent()
    setSureVisible(false)
    setExpanded(false)
    setDetailVisible(false)
  }
  const handlePressEdit = () => {}
  return (
    <Portal>
      <Modal
        visible={detailVisible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        {edit ? (
          <View>
            <TextInput
              label='Title'
              autoComplete={false}
              value={currentExp.title}
              // onChangeText={(text) =>
              //   setAddExpen((prev) => {
              //     return { ...prev, value: Number(text) }
              //   })
              // }
            />
            <TextInput
              label='Amount'
              keyboardType='number-pad'
              autoComplete={false}
              value={String(currentExp.value)}
              // onChangeText={(text) =>
              //   setAddExpen((prev) => {
              //     return { ...prev, value: Number(text) }
              //   })
              // }
            />
            <List.Section>
              <List.Accordion
                title={currentExp.category}
                expanded={expanded}
                onPress={() => setExpanded(!expanded)}
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
          </View>
        ) : (
          <View>
            <View
              style={{ justifyContent: 'space-between', flexDirection: 'row' }}
            >
              <Headline>{currentExp.title}</Headline>
              <Subheading>${currentExp.value}</Subheading>
            </View>
            <Subheading>{currentExp.category}</Subheading>
          </View>
        )}

        {/* <Subheading>{currentExp.date }</Subheading> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingTop: 50,
          }}
        >
          <Button icon={'delete'} onPress={() => setSureVisible(true)}>
            Delete
          </Button>
          <Button icon={'pencil'} onPress={() => setEdit((prev) => !prev)}>
            {edit ? 'cancel' : 'edit'}
          </Button>
        </View>
      </Modal>
      <Modal visible={sureVisible} contentContainerStyle={containerStyle}>
        <Subheading>Are you sure you want to delete?</Subheading>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Button onPress={handlePressDelete}>yes</Button>
          <Button onPress={() => setSureVisible(false)}>cancel</Button>
        </View>
      </Modal>
    </Portal>
  )
}
