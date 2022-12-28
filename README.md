# Palola 🐶

![](https://img.shields.io/badge/license-CC%20BY--NC--ND%204.0-blue)
![](https://img.shields.io/github/last-commit/totoi690/palola-web)
![](https://img.shields.io/github/repo-size/totoi690/palola-web)

> Plataforma para uso do dispositivo dispensador automático de ração: Palola.

<div align="center">
  <img src="public/palola-banner.png" height="380em" align="center"/>
  <img src="https://user-images.githubusercontent.com/68477006/209859787-fdf79484-cfda-44c6-8073-bef8e182ab79.png" height="380em" align="center"/>
  <img src="https://user-images.githubusercontent.com/68477006/209860005-758afeb4-8a47-487c-8b5b-462d416a5a94.png" height="380em" align="center"/>
</div>

## Funcionalidades 🧰
- ⏰ Definição de horários para despejo de ração;
- 🍖 Porcentagem da ração que está atualmente no pote;
- 🐩 Botão para encher o pote de ração na hora que quiser;
- 🔮 Dados das próximas refeições;
- 📅 Grupos de refeições pré-definidas (café da manhã, almoço e jantar);
- 📑 Registro das últimas refeições e seus status.

## Endpoints para Arduino 🌐
Todos os endpoints tem o endereço seguindo o seguinte modelo "https://palola.vercel.app/api/<ENDERECO\>". Todos os endpoint precisam que seja incluso na solicitação HTTP um header do tipo *authorization*, com a chave de identificação do Arduino. No momento, ainda não é possível adicionar seu próprio Arduino.
- ```startmeal``` (*POST*): recebe como parâmetro uma string, com o nome do grupo de refeicao que será criado. Retorna o ID da refeição criada e a marca como *PENDENTE*.  Coloca o status da máquina como *BUSY*;
- ```finishmeal``` (*POST*): recebe o status e o ID para setar para a refeição. Coloca o status da máquina como *FREE*;
- ```mealgroups``` (*GET*): mostra todos os grupos de Refeições, bem como seus horários;
- ```setpalolastatus``` (*POST*): muda o status da máquina;
- ```getpalolastatus``` (*GET*): retorna o status da máquina;
- ```setweight``` (*POST*): recebe o peso atual e o muda no banco de dados.

Nesse momento a plataforma ainda é de **uso fechado** e não é possível se cadastrar.
