import { Button, Checkbox, notification } from "antd"
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useState } from "react";
import { AuthApi, endpoint } from "../../configs/Api";
import "./register-seller.style.scss"




const RegisterSeller = () => {
    const [api, contextHolder] = notification.useNotification();
    const [check, setCheck] = useState<boolean>(false)
    const handleChangeCheck = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
        setCheck(e.target.checked)
    };
    const handleRegisterPartner = async () => {
        try {
            if (check === true) {
                const res = await AuthApi().post(endpoint.seller.register)
                console.log(res.data)
                if(res.data.status === 201){
                    api.open({
                        message: 'Thông báo',
                        description: 'Đăng ký thành công.',
                        duration: 4,
                    });
                }
            } else {
                api.open({
                    message: 'Thông báo',
                    description: 'Bạn phải chấp nhận các điều khoản thì với có thể trở thành đối tác của chúng tôi.',
                    duration: 4,
                });
            }
        } catch (error: any) {
            api.open({
                message: 'Thông báo',
                description: `${error.response.data.errors}`,
                duration: 4,
            });
        }
    }
    return (
        <div className="register-seller">
            {contextHolder}
            <div className="register-seller__center">
                <h2>GIỚI THIỆU</h2>
                <p>
                    Sứ mệnh của chúng tôi là mang đến cho người dùng những trả nghiệm mua sắm tốt nhất.
                </p>
                <p>
                    Tại Ecommerce, chúng tôi ưu tiên sự an toàn của người dùng, tính đa dạng, sự hòa nhập và tính chân thực trên ứng dụng.
                    Chúng tôi khuyến khích những nhà sáng tạo nội dung thể hiện cá tính riêng làm nên sự độc đáo của họ,
                    người xem tham gia thảo luận về những nội dung truyền cảm hứng cho họ; và chúng tôi tin rằng một môi trường an
                    toàn sẽ giúp người dùng trao đổi với nhau một cách cởi mở. Chúng tôi tôn trọng tính toàn cầu của cộng đồng TikTok và
                    luôn nỗ lực hết mình để tôn vinh sự đa dạng của các giá trị văn hóa địa phương. Ngoài ra, chúng tôi luôn hướng đến việc
                    xây dựng một môi trường chân thật, thông qua việc khuyến khích nội dung có tính xác thực trên ứng dụng.
                </p>
                <p>
                    Tiêu chuẩn Cộng đồng của chúng tôi áp dụng cho mọi người dùng và mọi nội dung trên TikTok. Chúng tôi chủ động thực thi
                    Tiêu chuẩn Cộng đồng bằng cách sử dụng kết hợp giữa công nghệ và sự kiểm duyệt của con người trước khi nội dung được báo
                    cáo cho chúng tôi. Chúng tôi cũng khuyến khích các thành viên trong cộng đồng sử dụng các công cụ mà chúng tôi cung cấp
                    trên TikTok để báo cáo bất kỳ nội dung nào mà họ cho rằng vi phạm Tiêu chuẩn Cộng đồng của chúng tôi.
                </p>
                <h2>HÀNH VI THÙ ĐỊCH</h2>
                <p>
                    Ecommerce là một sàn thương mại điện tử đảm bảo an toàn tới tất cả mọi người.
                    Chúng tôi không cho phép nội dung chứa ngôn từ hay hành vi kích động thù địch và sẽ xóa nội
                    dung đó khỏi nền tảng của mình. Chúng tôi sẽ cấm các tài khoản và/hoặc người dùng vi phạm nghiêm trọng hoặc nhiều
                    quy định về ngôn từ kích động thù địch, hoặc có liên quan đến ngôn từ kích động thù địch.
                </p>
                <p>
                    Biệt ngữ miệt thị được định nghĩa là những thuật ngữ mang tính xúc phạm nhằm miệt thị các nhóm hoặc cá nhân dựa trên các
                    thuộc tính được bảo vệ. Để giảm thiểu sự phổ biến của các thuật ngữ gây xúc phạm, chúng tôi sẽ xóa tất cả những từ ngữ miệt
                    thị khỏi nền tảng của mình, trừ khi các thuật ngữ đó được chuyển đổi mục đích sử dụng, dùng để chỉ bản thân (nghĩa là do các
                    thành viên trong nhóm được bảo vệ sử dụng) hoặc được sử dụng mà không mang ý chê bai (ví dụ: bối cảnh giáo dục).
                </p>
                <p>
                    Quan điểm của chúng tôi là kiên quyết không cho phép lừa đảo. Chúng tôi không cho phép người
                    dùng sử dụng nền tảng của chúng tôi để lừa đảo, chuộc lợi cá nhân mà không quan tâm đến những người khác, hoặc quảng bá cho các cá nhân,
                    tổ chức hoặc hành động bạo lực cực đoan. Khi có mối đe dọa đối với sự an toàn của cộng đồng, hoặc khi một tài khoản được sử dụng
                    để cổ xuý hoặc tôn vinh bạo lực ngoài nền tảng, chúng tôi có thể tạm ngưng hoặc cấm tài khoản đó. Khi nhận được lệnh,
                    chúng tôi sẽ báo cáo các mối đe dọa đó cho các cơ quan pháp luật có liên quan. Để bảo vệ cộng đồng một cách hiệu quả,
                    chúng tôi có thể xem xét các hành động ngoài nền tảng để xác định các tổ chức và cá nhân bạo lực cực đoan trên nền tảng của mình.
                    Nếu chúng tôi tìm thấy những tổ chức hoặc cá nhân như vậy trên TikTok, chúng tôi sẽ cấm tài khoản của họ.
                </p>
                <div>
                    <Checkbox style={{ fontSize: '16px', marginTop: '20px', color: 'red' }} onChange={handleChangeCheck}>Đồng ý với điều khoản của chúng tôi.</Checkbox>
                </div>
                <Button type="primary" size="large" className="btn-color mgt-40" onClick={handleRegisterPartner}>Đăng ký trở thành đối tác</Button>
            </div>
        </div>
    )
}

export default RegisterSeller

