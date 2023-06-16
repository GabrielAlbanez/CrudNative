import { StatusBar } from "expo-status-bar";
import { Alert, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
export default function App() {
  const [produtos, setProdutos] = useState([]);
  const [nomeProduto, setNomeProduto] = useState("")
  const [dataValidade, setDataValidade] = useState("")
  const [verificarData, setVerificarData] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [upadateModalVisible, setUpdateModalVisible] = useState(false)
  const [selectProduto, setSelectProduto] = useState(null)


  const pegarProdutos = async () => {
    axios
      .get(url)
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => console.log(error));
  };

  const limparRespostas = () => {
    setNomeProduto("")
    setDataValidade("")
    
  }

  const auxiliadorDeDeletacao = (id) => {
    Alert.alert(
      'Realmente quer excluir esse produto',
      [{
        text: 'Sim',
        onPress: () => deletarProduto(id)
      },
      {
        text: 'não',
      
      }
      ]
    )
  }

  const deletarProduto = (id) => {
    axios.delete(`${url}/${id}`)
      .then(() => {
        const produtosAtualizados = usuarios.filter((produto) => produto.id !== id)
        setProdutos(produtosAtualizados)
      })
      .catch((errors) => { console.log(errors) })
  }



  const criarNovoProduto = () => {
    axios.post(url, {
      name: nomeProduto,
      dataValidade: dataValidade,
      verficacao:verificarData
    })
      .then(resposta => {
        console.log(resposta.data)
        pegarProdutos()
        setModalVisible(false)
        limparRespostas()
      })
      .catch(error => {
        console.log(error)
      })
  }

  






  return (
    <View style={styles.container}>
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Adicionar Produto</Text>
          <TextInput
            style={styles.input}
            placeholder="nomeProduto"
            value={nomeProduto}
            onChangeText={text => setNomeProduto(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="data Valdiade"
            value={dataValidade}
            onChangeText={text => setDataValidade(text)}
          />
          <TouchableOpacity style={styles.button} onPress={criarNovoProduto}>
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={setModalVisible(false)}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        visible={upadateModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setUpdateModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Atualizar Produto</Text>
            <TextInput
              style={styles.input}
              placeholder="nome produto"
              value={nomeProduto}
              onChangeText={text => setNomeProduto(text)}
            />
           </View>
    </View>
  );
}

