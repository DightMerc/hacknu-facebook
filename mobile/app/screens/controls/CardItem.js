import * as React from 'react';

import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import COLORS from '../colors';
import moment from 'moment';


export default class CardItem extends React.Component {

  constructor(props) {
    super(props)
  }

  state = {
    Performer: 'loading',
    RequestType: 'loading',
    Customer: 'loading'

  }

  componentDidMount() {
    engine.db.transaction(
      tx => {
        tx.executeSql(
          `SELECT * FROM responsible WHERE GUID="${this.props.data.Performer}"`,
          [],
          (txObj, resultSet) => {
            if (resultSet.rows['_array'].length != 0) {
              this.setState({ Performer: resultSet.rows['_array'][0].Description })
            } else {
              this.setState({ Performer: 'Не назначено' })
            }
          },
          (txObj, error) => {
            console.log(error)
          }
        )

        tx.executeSql(
          `SELECT * FROM responsible WHERE GUID="${this.props.data.Customer}"`,
          [],
          (txObj, resultSet) => {
            if (resultSet.rows['_array'].length != 0) {
              this.setState({ Customer: resultSet.rows['_array'][0].Description })
            } else {
              this.setState({ Customer: 'Не назначено' })
            }
          },
          (txObj, error) => {
            console.log(error)
          }
        )

        tx.executeSql(
          `SELECT * FROM request_type WHERE GUID="${this.props.data.RequestType}"`,
          [],
          (txObj, resultSet) => {
            if (resultSet.rows['_array'].length != 0) {
              this.setState({ RequestType: resultSet.rows['_array'][0].Description })
            } else {
              this.setState({ RequestType: 'Неизвестно' })
            }
          },
          (txObj, error) => {
            console.log(error)
          }
        )
      }
    )
  }
  render() {
    return (
      <TouchableOpacity style={styles.Container} onPress={this.props.onPress}>

        <View style={styles.LeftSide}>
          <View style={{ marginTop: 12, marginLeft: 12 }}>
            <Text style={styles.InfoItemLabel}>Маркет:</Text>
            <Text style={styles.InfoItemValue}>{this.state.Customer}</Text>
          </View>

          <View style={{ marginTop: 10, marginLeft: 12 }}>
            <Text style={styles.InfoItemLabel}>Статус:</Text>
            <Text style={styles.InfoItemValue}>{this.props.data.Status == 'ВОбработке' ? 'В обработке' : this.props.data.Status}</Text>
          </View>

          <View style={{ marginTop: 10, marginLeft: 12 }}>
            <Text style={styles.InfoItemId}>{this.props.data.RequestNumber}</Text>
          </View>
        </View>



        <View style={styles.RightSide}>
          <View style={{ marginTop: 12, marginLeft: 12 }}>
            <Text style={styles.InfoItemLabel}>Вид заявки:</Text>
            <Text style={styles.InfoItemValue}>{this.state.RequestType}</Text>
          </View>

          <View style={{ marginTop: 10, marginLeft: 12 }}>
            <Text style={styles.InfoItemLabel}>Исполнитель:</Text>
            <Text style={styles.InfoItemValue}>{this.state.Performer}</Text>

          </View>

          <View style={styles.InfoItemDateContainer}>
            <Text style={styles.InfoItemDate}>{moment(this.props.data.RequestDate, 'YYYYMMDDHHmmss').format('DD.MM.YYYY')}</Text>
          </View>
        </View>

      </TouchableOpacity>
    )


  }
}

const styles = StyleSheet.create({
  Container: {
    height: 115,
    marginVertical: 4,
    marginHorizontal: 24,
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,

    shadowColor: COLORS.MAIN,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 1,
  },
  LeftSide: {
    flex: 1,
  },
  RightSide: {
    flex: 2,
  },
  InfoItemLabel: {
    color: COLORS.MAIN,
    fontFamily: 'Montserrat',
    fontSize: 11,
    fontWeight: '400',
    fontStyle: 'normal'
  },
  InfoItemValue: {
    color: COLORS.TEXT,
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal'
  },
  InfoItemId: {
    color: COLORS.SECONDARY,
    fontFamily: 'Montserrat',
    fontSize: 11,
    fontWeight: '400',
    fontStyle: 'normal'
  },
  InfoItemDate: {
    color: COLORS.SECONDARY,
    fontFamily: 'Montserrat',
    fontSize: 11,
    fontWeight: '400',
    fontStyle: 'normal',
  },
  InfoItemDateContainer: {
    marginTop: 10,
    marginRight: 12,
    alignSelf: 'flex-end'
  }
})