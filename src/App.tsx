import React, { useState } from 'react';
import './App.css';
import { Col, Container, ListGroup, Row, Card, Button, Navbar, Table } from 'react-bootstrap';
import _ from 'lodash';
import QRCode from "react-qr-code";

const categoryList = ['精美點心','即拉腸粉','自製包點','煎炸點心','甜美糕點','田園蔬菜','皇牌蒸飯','粥類','飲品','其他',]
const itemList = [{name:'（蒸）上海菜肉包',price:7,catId:3,shortForm:'蒸 菜肉'},
{name:'（煎）上海菜肉包',price:7,catId:3,shortForm:'煎 菜肉'},
{name:'1蚊',price:1,catId:10,shortForm:'1蚊'},
{name:'隨心蝦餃皇',price:27,catId:1,shortForm:'蝦餃皇'},
{name:'韭菜鮮蝦餃',price:22,catId:1,shortForm:'韭菜餃'},
{name:'蟹柳滑雞扎',price:20,catId:1,shortForm:'雞扎'},
{name:'鵪鶉蛋燒賣',price:20,catId:1,shortForm:'鵪鶉蛋'},
{name:'蟹籽燒賣皇',price:20,catId:1,shortForm:'燒賣'},
{name:'牛肉燒賣皇',price:18,catId:1,shortForm:'牛肉燒賣'},
{name:'蠔油鮮竹卷',price:19,catId:1,shortForm:'鮮竹卷'},
{name:'醬皇蒸鳳爪',price:19,catId:1,shortForm:'鳳爪'},
{name:'足料糯米雞',price:25,catId:1,shortForm:'糯米雞'},
{name:'排骨白腸粉',price:35,catId:1,shortForm:'排骨腸粉'},
{name:'豉汁蒸排骨',price:19,catId:1,shortForm:'排骨'},
{name:'鮮竹牛肉球',price:19,catId:1,shortForm:'牛肉球'},
{name:'招牌珍珠雞 (一隻)',price:10,catId:1,shortForm:'珍珠 一隻'},
{name:'招牌珍珠雞 (兩隻)',price:18,catId:1,shortForm:'珍珠 兩隻'},
{name:'招牌珍珠雞 (三隻)',price:25,catId:1,shortForm:'珍珠 三隻'},
{name:'隨心鮮蝦腸',price:28,catId:2,shortForm:'蝦腸'},
{name:'蜜汁叉燒腸',price:24,catId:2,shortForm:'叉燒腸'},
{name:'香茜牛肉腸',price:24,catId:2,shortForm:'牛肉腸'},
{name:'竹笙羅漢齋腸',price:24,catId:2,shortForm:'羅漢齋腸'},
{name:'脆皮春卷腸',price:24,catId:2,shortForm:'春卷腸'},
{name:'葱花蝦米腸',price:24,catId:2,shortForm:'蝦米腸'},
{name:'混醬布拉腸',price:20,catId:2,shortForm:'布拉腸'},
{name:'蜜汁叉燒包',price:7,catId:3,shortForm:'叉燒'},
{name:'鬆軟馬拉糕',price:7,catId:3,shortForm:'馬拉'},
{name:'鳳凰奶皇包',price:7,catId:3,shortForm:'奶皇'},
{name:'黑芝麻蓉包',price:7,catId:3,shortForm:'芝麻'},
{name:'家鄉糯米卷',price:7,catId:3,shortForm:'糯米卷'},
{name:'北方白饅頭',price:6,catId:3,shortForm:'饅頭'},
{name:'鮮蝦春卷',price:18,catId:4,shortForm:'春卷'},
{name:'鮮蝦腐皮卷',price:18,catId:4,shortForm:'腐皮卷'},
{name:'香煎蘿蔔糕',price:18,catId:4,shortForm:'蘿蔔糕'},
{name:'脆炸雲吞',price:16,catId:4,shortForm:'雲吞'},
{name:'蓮蓉煎堆仔',price:16,catId:4,shortForm:'煎堆'},
{name:'咸水角',price:18,catId:4,shortForm:'咸水'},
{name:'養顏姜汁糕(三件)',price:12,catId:5,shortForm:'姜汁糕'},
{name:'滋潤紅枣糕(三件)',price:12,catId:5,shortForm:'紅枣糕'},
{name:'白灼菜芯',price:18,catId:6,shortForm:'菜芯'},
{name:'田園唐生菜',price:18,catId:6,shortForm:'生菜'},
{name:'鳳爪排骨飯',price:29,catId:7,shortForm:'鳳爪排骨'},
{name:'北菇滑雞飯',price:29,catId:7,shortForm:'北菇雞'},
{name:'臘腸滑雞飯',price:29,catId:7,shortForm:'臘腸雞'},
{name:'(蒸)蛋牛肉飯',price:29,catId:7,shortForm:'蒸 蛋牛'},
{name:'(煎)蛋牛肉飯',price:29,catId:7,shortForm:'煎 蛋牛'},
{name:'竹笙羅漢齋飯',price:29,catId:7,shortForm:'羅漢齋'},
{name:'南瓜排骨飯',price:29,catId:7,shortForm:'南瓜'},
{name:'荷葉蟲草花蒸滑雞飯',price:42,catId:7,shortForm:'蟲草雞'},
{name:'荷葉蟲草花蒸排骨飯',price:42,catId:7,shortForm:'蟲草排骨'},
{name:'皮蛋瘦肉粥',price:16,catId:8,shortForm:'皮蛋瘦'},
{name:'粟米南瓜粥',price:16,catId:8,shortForm:'南瓜'},
{name:'軟綿綿白粥',price:16,catId:8,shortForm:'白粥'},
{name:'汽水',price:8,catId:9,shortForm:'汽水'},
{name:'土魷肉餅飯',price:29,catId:7,shortForm:'肉餅'},
{name:'北菇綿花雞',price:22,catId:1,shortForm:'北菇雞'},
  {name:'肉骨茶',price:17,catId:11,shortForm:'肉骨茶'},]

  const ReceiptPage = ({ result }: { result: any[] }) => {
    const detailedSelectedList = result.map(e => itemList.find(item => item.name == e))
    console.log(detailedSelectedList)
  return <>
  <Container>
    <Row>
      <Col>
      <Card>
        <Card.Text style={{ fontSize: 30, textAlign: 'center' }}>單號</Card.Text>
        <Card.Title style={{ textAlign: 'center', fontSize: 50 }}>001</Card.Title>
      </Card>
      </Col>
    </Row>
    <Row>
      <Col>
      <Card>
        <Card.Title style={{ fontSize: 30, textAlign: 'center' }}>訂單詳細</Card.Title>
        {detailedSelectedList.map(e => e && (
          <Card.Text style={{ margin: '10px 0', fontSize: 20 }}>
            <Container>
              <Row>
                <Col xs={5}>{e.name || ''}</Col>
                <Col>x 1</Col>
                <Col>${e?.price || ''}</Col>
              </Row>
            </Container>
          </Card.Text>
        ))}
      </Card>
      </Col>
    </Row>
    <Row>
      <Col>
      <Card style={{ padding: '50px' }}>
        <QRCode value={`https://google.com/${result.join(',')}`} />
      </Card>
      </Col>
    </Row>
  </Container>
  </>
}

function App() {
  const [selectedCat, setSelectedCat] = useState(0)
  const [selectedItemList, setSelectedItemList] = useState<string[]>([])
  const [isReceipt, setIsReceipt] = useState(false)
  return (
    !isReceipt ?<>
      <Container fluid style={{height: '100%' }} >
        <Row>
          <Col xs={4} style={{ padding: 0, height: '100%' }}>
          <ListGroup as="ul">
            {categoryList.map((e, idx) => 
            <ListGroup.Item
              style={{ height: 56 }}
              as="li"
              active={selectedCat === idx}
              onClick={() => setSelectedCat(idx)}
            >
              {e}
            </ListGroup.Item>
            )}
          </ListGroup>
          </Col>
          <Col xs={8}>
            <Container style={{ maxHeight: window.innerHeight - 180, overflow: 'scroll' }}>
              <Row>
                  {itemList.filter(e => e.catId - 1 === selectedCat).map((item: any) => {
                    const isSelected = selectedItemList.findIndex(e => e === item.name) > -1
                    return <Col xs={6} style={{ padding: 0 }}>
                    <Card
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: isSelected ? 'green' : 'white',
                        color: isSelected ? 'white' : 'black'
                      }}>
                      <Card.Body
                        onClick={() => {
                          setSelectedItemList((prev:string[]) => {
                            if (prev.findIndex(selectedItem => selectedItem === item.name) < 0) {
                              return [...prev, item.name]
                            }
                            return prev.filter(e => e !== item.name)
                          })
                        }}
                      >
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>${item.price}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  
                  })}
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
      <div id="footer">
        <div style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          height: 100,
          backgroundColor: 'black',
          color: 'white',
          fontSize: 50,
          float: 'left'
        }}>
          總計: ${_.sum(selectedItemList.map(e => itemList.find(item => item.name == e)?.price)) || 0} 
        </div>
        <button
          style={{
            position: 'absolute',
            bottom: 65,
            right: 25,
            padding: 30,
            border: 'none',
            borderRadius: '50%',
            backgroundColor: 'green',
            color: 'white'
          }}
          onClick={() => setIsReceipt(true)}
          >
            確定
          </button>
      </div>
    </>
  :<>
  <Navbar bg="dark" variant="dark">
   <Navbar.Brand onClick={() => setIsReceipt(false)} style={{ padding: '0 30px' }}>{'<返回'}</Navbar.Brand>
  </Navbar>
    <ReceiptPage result={selectedItemList} />
  </>
  );
}

export default App;
