import { StatusBar } from "expo-status-bar";
import { Alert,  Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
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
        setProdutos(response.data);
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
        const produtosAtualizados = produtos.filter((produto) => produto.id !== id)
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
    <View>
      <Modal visible={modalVisible} animationType="slide">
        <View >
          <Text >Adicionar Produto</Text>
          <TextInput
            placeholder="nomeProduto"
            value={nomeProduto}
            onChangeText={text => setNomeProduto(text)}
          />
          <TextInput
            placeholder="data Valdiade"
            value={dataValidade}
            onChangeText={text => setDataValidade(text)}
          />
          <TouchableOpacity  onPress={criarNovoProduto}>
            <Text>Adicionar</Text>
          </TouchableOpacity>

          <TouchableOpacity  onPress={setModalVisible(false)}>
            <Text>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        visible={upadateModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setUpdateModalVisible(false)}
      >
        <View>
          <View>
            <Text >Atualizar Produto</Text>
            <TextInput
              placeholder="nome produto"
              value={nomeProduto}
              onChangeText={text => setNomeProduto(text)}
            />
           </View>
    </View>
  );
}

