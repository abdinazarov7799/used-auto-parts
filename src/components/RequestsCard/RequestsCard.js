import {Col, Row} from "reactstrap";
import {timeSince} from "../TimeSince/TimeSince";
import {useState} from "react";
import {Button, Modal, Tooltip} from "antd";
import {CopyOutlined} from "@ant-design/icons";

function RequestsCard(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    function copyToClipboard(text) {
        const el = document.createElement('textarea');
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }
    return(
      <>
        <div className='d-flex mb-4 p-2'
             key={props.RequestID}
             style={{background: '#fff',
                 boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.10)',
                 borderRadius: 10,
                 cursor: "pointer"
             }}
             onClick={showModal}
        >
            <Col xs={4}>
                <div style={{
                    width: '100%',
                    height: '108px',
                    backgroundImage: `url('${props.ImagePath}')`,
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    borderRadius: '10px'
                }}>

                </div>
            </Col>
            <Col xs={8} className='ms-2'>
                <p className='mb-1'><span className='fw-bold'>Spare part:</span> {props.PartDescription}</p>
                <p className='mb-1'><span className='fw-bold'>Brand:</span> {props.BrandName}</p>
                <p className='mb-1'><span className='fw-bold'>VIN:</span> {props.VIN}</p>
                <p className='fw-medium mb-0' style={{color: '#BDBDBD'}}>{timeSince(props.RequestDate)}</p>
            </Col>
        </div>
          <Modal title="My Request"
                 open={isModalOpen}
                 onOk={handleOk}
                 onCancel={handleCancel}
                 footer={[
                     <Button key="close" onClick={handleCancel}>
                         Close
                     </Button>
                 ]}
                 style={{
                     top: '20px'
                 }}
          >
              <div style={{
                  width: '100%',
                  height: '360px',
                  backgroundImage: `url('${props.ImagePath}')`,
                  backgroundPosition: 'center center',
                  backgroundSize: 'cover',
              }}
                   className='mt-3 mb-3'
              ></div>
              <p className='mb-1'><span className='fw-bold'>Spare part:</span> {props.PartDescription}</p>
              <p className='mb-1'><span className='fw-bold'>Brand:</span> {props.BrandName}</p>
              <p className='mb-1'><span className='fw-bold'>Car Description:</span> {props.CarDescription}</p>
              <p className='mb-1 d-flex align-items-center'><span className='fw-bold me-1'>VIN: </span>
                  {props.VIN}
                  <Tooltip title="Copied" className='p-0'>
                      <Button
                          type="link"
                          icon={<CopyOutlined />}
                          onClick={() => copyToClipboard(props.VIN)}
                          className='d-flex align-items-center ms-1'
                      />
                  </Tooltip>
              </p>
          </Modal>
      </>
    );
}
export default RequestsCard
