// VeggieLCC-Development キー
// export const API_KEY = 'AIzaSyCIzVOK-AlbmZ-chbxmhvIfNPSMR6inwWA'
// mievegi-Development キー
export const API_KEY = 'AIzaSyD8d8q3meo_WMhCnZ-6rv_dJKTlJRSKtDY'
// VeggieLCC-Production キー　（制限などの設定はまだ行っていない）
// export const API_KEY = 'AIzaSyCNBOoZC_2w9rb700MjG4d1IjzriTFbxnE'
export const USAGE_TERMS_LINK = "https://docs.google.com/document/d/1noQrXmXHWJeF5c3uC2iiRoGBHijm51qWhuaCNf5-JZA/edit"; // 'https://drive.google.com/file/d/1i1YJtszFVR4fkTt_JvS1y0sjHvmel7ME/view?usp=sharing'
export const PERSONAL_TERMS_LINK = "https://docs.google.com/document/d/1-iEbkh0vGpKU9Lza1iSMR4xVcvpbLMOvKLxCqj1vnbk/edit"; //'https://drive.google.com/file/d/11aQIM-k7CWfWLLBtEwSpANJj6axJNHxP/view?usp=sharing'
export const GOOGLE_ANALYTICS_ID = 'UA-197761395-1'
export const VEGGIE_OWNER_ID = "6qL8F80e4dRxm7UmQudSkPp8HAS2"
export const InputHourType = Object.freeze({
                              "is_open": "0",
                              "is_24hrs": "1",
                              "is_closed": "3",
                              "not_set": "4"
                            })
export const PublishState = Object.freeze({
                              "private": "非公開", 
                              "public": "公開"
                            })
export const BreadcrumbText = Object.freeze({
                                "index": "TOP", 
                                "map": "マップ",
                                "notifications": "お知らせ", 
                                "timeline": "タイムライン", 
                                "mypage": "マイページ", 
                                "favorites":"お気に入り直売所",
                                "users": "ユーザー一覧", 
                                "directSales": "直売所一覧",
                                "point": "マイポイント管理",
                                "pointAdmin": "ポイント管理者",
                                "premium": "購入保険料",
                              })
export const BreadcrumbLink = Object.freeze({
                                "index": "/", 
                                "map": "/map",
                                "notifications": "/notifications/", 
                                "timeline": "/timeline/", 
                                "mypage": "/mypage/", 
                                "favorites":"/mypage/favorites/",
                                "users": "/users/", 
                                "directSales": "/directSales/",
                                "point": "/point/",
                                "pointAdmin": "/point/admin/",
                                "premium": "/premium/",
                                "premiumSuccess": "/premium/success",
                                "premiumFailed": "/premium/failed",
                              })

export const PointType = Object.freeze({
                          "firstVisit": "初回チェックイン", 
                          "secondVisit": "チェックイン",
                          "postComment": "みんなの投稿", 
                          "postTimeline": "タイムライン投稿",
                          "addDirectSaleImage": "直売所画像投稿",
                          "addDirectSale": "直売所登録",
                        })