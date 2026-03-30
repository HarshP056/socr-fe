import {
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CommonService } from 'src/app/services';
import { Location } from "@angular/common";
import { SocrOcrService } from 'src/app/services/socr-ocr.service';

@Component({
  selector: 'app-ocr-details-d',
  templateUrl: './ocr-detail-d.component.html',
  styleUrls: ['./ocr-detail-d.component.scss']
})
export class OcrDetailsDComponent {
  @ViewChild('documentCanvas', { static: true }) documentCanvas: ElementRef<HTMLCanvasElement>;
  ocrId: any;
  invoiceOCRData: any;
  ocrDetails: any;
  ctx: any;
  _apiUrl: string = environment.apiUrl;

  // ocrResults = {
  //   "status": "succeeded",
  //   "createdDateTime": "2024-03-20T19:42:56Z",
  //   "lastUpdatedDateTime": "2024-03-20T19:43:08Z",
  //   "analyzeResult": {
  //     "apiVersion": "2024-02-29-preview",
  //     "modelId": "prebuilt-invoice",
  //     "stringIndexType": "utf16CodeUnit",
  //     "content": "TWI0003278\n6PG\nTAX INVOICE\nOriginal for Recipient\nWhether Tax is Payable under Reverse Charge Mechanism: No\nSupplying Location Address\nInvoice Details\nOrder No .: 5120189447\nAsian Paints PPG Pvt Ltd-5555\nInvoice\nMH2351025135\nOrder Date : 29.02.2024\nB3 Gala,Sairaj Warehouse,\nNo .:\nOpp All Saints High School, Lonar\nDelivery :\n0402891877\nRoad,-\nBhawale Village,Bhiwandi 421302\nInvoice Date: 29.02.2024\nDel. Date: 29.02.2024\nARegistered Address:\nCategory : B2B\nAsan Paints PPG Pvt Ltd\nTransaction Type : Bill To\nInt. Ref. No: 1360475518\nIGA Shanti Nagar, Santacruz\nShip To\n06L043980 /\nKtast)\nReference :\nPAN No. : AAJCA7128D\n29.02.2024\nVirtua: 400055\nState: Maharashtra\nState Code : 27\nGSTIN : 27AAJCA7128D1ZS\n1360475518\nIRN No .: 997c0076d4aca66ab66779a21946a80da0f4ab21152e474626611391bf4eca1b\nAcknowledgement No. : 122420388464075 Acknowledgement Date : 2024-02-29\nQR Type : IRN\nBill To Party\nShip To Party\nDetails\nRemarks\nCustomer\n0000566518\nCustomer\n1030109098\nTerms of Payment : Pmt due within\nLARSEN & TOUBRO LIMITED\nLARSEN & TOUBRO LIMITED\nA b: 7, 8, 10, 11, LARSEN TOUBRO LI\nDEFENCE DIVISION, PLOT NO .: A5, A7, & A11\n60 days of invoice date\nTerms Of Delivery: D02\nDEHENCI IC, MIDC, TALEGAON\nTALEGAON MIDC, VILLAGE NAVLAK\nDue Date : 29.04.2024\n420 Uhr Received by\nPone, Maharashtra, 410507\nUMBRE, TALUKA MAVAL, DISTRICT PUNE\nGross Weight:3157.920 KG\npoint shop2\nTALL GAON 410507\nUMBRE 410507\nVolume:2160 Kg/Lt/M\nĐại No: 2114669215\nTel No: 7447413004\nNet Weight:2909.520 KG CEIVED SIGN (Ny)\nprotrom mohite\nPAN AAACI 0140P\nState Code : 27\nPlace of Supply : Maharashtra\nGSTIN/UniqueID :\nCurrency : INR/Indian Rupee\nStorage Loc .: 1001\nPS NO.\n20319654\nGSTIN/Unique ID : 27AAACL0140PAZA\nSite Contact Person:\nState Code 2/\nSite Contact Person Ph: 2114669215\nLogSheet No:\nGC Note No:\nNAME\nDestory Code : 00G5550011\n+Como93007\nVehicle No:\nPROJECT NO : DEBIT\nSOEn 836\nhieral Name I ARSEN & TOUBRO LIMITED\nMode of transport:\nCODE\n2/3/2024\nMaterial\nDescription\nQty\nPacks\nVolume\nRate\nDATE\nValue\nIn-Bill\nIn-Bill\nCash\nTaxable\nTax\nTotal\nHSN\n(Lt/Kg)\n(INR/ %)\nDisc.\nDisc. 2\nDisc.\nAmount\nAmount\nAmount\n3430229320\nAPTHANHBPUFIN\n108\n108\n2160.000\n5600.00\n604800.00\n604800.00\n713664.00\nOLIVEGRN 20LT\nDR\n=\nMSN. 320890\nIN: Central GST OP\n9.00\nIN: State GST OP\n9.00\n54432.00\n54432.00\n604800.00\n0.00\n0.00\n0.00\n604800.00\n108864.00\n713664.00\nSummary\nTaxable Amount\nTotal Amount\nTaxable Amount\n604800.00\nIN : Central GST- OP 9 %\n604800.00\n54432.00\nIN : State GST- OP 9 %\n604800.00\n54432.00\nTotal Amt. before rounding\n713664.00\nTotal Invoice Value ( In Words ) :\nSeven Lakh Thirteen Thousand Six Hundred Sixty Four Rupees Only\nBochan tre Identification Number (CIN): U24110MH2011PTC220557\nCustomer\nPackage Summary\nAuthorized Signatory\ntil Feedback/complaints, email to: customercare.apppg@asianpaintsppg.com\nHardner\n111\nKe Bonne Office : Plot no. 5, Gaiwadi Industrial Estate,\nAcknowledgement\nDigitally signed by SAGAR\n3 V Road, Goregaon (west), Mumbai 400 062 Ph.No. 022 62182700\nReceipt Date\nBase\n111\nSAGAR\nSHRIKRISHNA KHADE\nDN: cn=SAGAR SHRIKRISHNA\nFre eripayment of this bill is not received within due date interest at 18% will be\nSHRIKRI\nKHADE, c=IN, st-Maharashtra,\nO ASIAN PAINTS PPG PRIVATE\nLIMITED, ou-MANAGEMENT,\nserialNumbers\nF087D64B9EDD6CC05130A98\nAny et ference or dispute arising under this document/contract shall be subject to\nReceipt Time\nSHNA\n3170F11DE01B5DA6349201E\nexasive jusrisdiction of the courts in Mumbai\nEBC2CD62B8833D96D5\nReason: I attest to the\nCustomer Sign &\nKHADE\naccuracy and integrity of this\ndocument\nStamp\nDate: 2024.02.29 23:15:05\nTotal Packs: 222\n+05'30\nDECLARATION\nBrent ie sub ect to our standard terms and conditions as per our dealer price list.\npå vand except on our official form.We have enabled additional electronic mode of accepting payment at onlinepayment.asianpaintsppg.com\nMR/BA CH NO and date of manufacture appearing on the package and cite the same in case of a complaint.\nPendientee are ox Depot, with Freight being prepaid by the Company for delivery at the Destination ...\nno way it is discretion, may compensate for Leakages and Breakages that occur in transit after evaluation of the chain die Frage & Shortages that occur at Dealer Shop or Site will be to Dealer / Purchaser's A/\n1- Hhín Đồ Sức along with Hardeners\nMATT\n5. DIC-SSC TALEGAOR\nTotal Amount includes Commercial Rounding as applicable\nTAPPSTAL\n15859\nPage 1 of 1\nTIMAI 9'30 DATE: 02/3/24\nSec. Supir ame\np\nSIG",
  //     "pages": [
  //       {
  //         "pageNumber": 1,
  //         "angle": 0,
  //         "width": 8.1389,
  //         "height": 11.6944,
  //         "unit": "inch",
  //         "words": [
  //           {
  //             "content": "TWI0003278",
  //             "polygon": [
  //               5.1382,
  //               0.0406,
  //               6.8797,
  //               0.0406,
  //               6.8746,
  //               0.2386,
  //               35.143,
  //               0.2487
  //             ],
  //             "confidence": 0.849,
  //             "span": {
  //               "offset": 0,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "6PG",
  //             "polygon": [
  //               0.9241,
  //               0.3807,
  //               1.2135,
  //               0.3705,
  //               1.2236,
  //               0.5736,
  //               0.9241,
  //               0.5837
  //             ],
  //             "confidence": 0.679,
  //             "span": {
  //               "offset": 11,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "TAX",
  //             "polygon": [
  //               1.6247,
  //               0.269,
  //               1.8177,
  //               0.269,
  //               1.8177,
  //               0.3858,
  //               1.6298,
  //               0.3807
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 15,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "INVOICE",
  //             "polygon": [
  //               1.838,
  //               0.269,
  //               2.2695,
  //               0.269,
  //               2.2695,
  //               0.3858,
  //               1.8431,
  //               0.3858
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 19,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "Original",
  //             "polygon": [
  //               3.2241,
  //               0.2792,
  //               3.5846,
  //               0.2741,
  //               3.5846,
  //               0.4061,
  //               3.2292,
  //               0.401
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 27,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "for",
  //             "polygon": [
  //               3.61,
  //               0.2741,
  //               3.7369,
  //               0.2741,
  //               3.742,
  //               0.4061,
  //               3.61,
  //               0.4061
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 36,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "Recipient",
  //             "polygon": [
  //               3.7673,
  //               0.2741,
  //               4.2141,
  //               0.2741,
  //               4.2141,
  //               0.4061,
  //               3.7673,
  //               0.4061
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 40,
  //               "length": 9
  //             }
  //           },
  //           {
  //             "content": "Whether",
  //             "polygon": [
  //               4.6254,
  //               0.2792,
  //               5.0316,
  //               0.2792,
  //               5.0316,
  //               0.401,
  //               4.6254,
  //               0.3959
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 50,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "Tax",
  //             "polygon": [
  //               5.057,
  //               0.2792,
  //               5.2042,
  //               0.2792,
  //               5.2042,
  //               0.4061,
  //               5.057,
  //               0.4061
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 58,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "is",
  //             "polygon": [
  //               5.2296,
  //               0.2792,
  //               5.3058,
  //               0.2792,
  //               5.3058,
  //               0.4061,
  //               5.2296,
  //               0.4061
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 62,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "Payable",
  //             "polygon": [
  //               5.3312,
  //               0.2792,
  //               5.6967,
  //               0.2792,
  //               5.6967,
  //               0.4111,
  //               5.3312,
  //               0.4061
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 65,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "under",
  //             "polygon": [
  //               5.7221,
  //               0.2792,
  //               5.9963,
  //               0.2792,
  //               5.9963,
  //               0.4111,
  //               5.7221,
  //               0.4111
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 73,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "Reverse",
  //             "polygon": [
  //               6.0166,
  //               0.2792,
  //               6.3821,
  //               0.2842,
  //               6.3821,
  //               0.4111,
  //               6.0166,
  //               0.4111
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 79,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "Charge",
  //             "polygon": [
  //               6.4075,
  //               0.2842,
  //               6.7426,
  //               0.2842,
  //               6.7426,
  //               0.4162,
  //               6.4075,
  //               0.4111
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 87,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "Mechanism:",
  //             "polygon": [
  //               6.768,
  //               0.2842,
  //               7.3214,
  //               0.2893,
  //               7.3214,
  //               0.4162,
  //               6.768,
  //               0.4162
  //             ],
  //             "confidence": 0.961,
  //             "span": {
  //               "offset": 94,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "No",
  //             "polygon": [
  //               7.3468,
  //               0.2893,
  //               7.489,
  //               0.2893,
  //               7.489,
  //               0.4162,
  //               7.3468,
  //               0.4162
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 105,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "Supplying",
  //             "polygon": [
  //               1.7669,
  //               0.5228,
  //               2.2645,
  //               0.5228,
  //               2.2645,
  //               0.6548,
  //               1.7669,
  //               0.6548
  //             ],
  //             "confidence": 0.991,
  //             "span": {
  //               "offset": 108,
  //               "length": 9
  //             }
  //           },
  //           {
  //             "content": "Location",
  //             "polygon": [
  //               2.2899,
  //               0.5228,
  //               2.7265,
  //               0.5228,
  //               2.7265,
  //               0.6548,
  //               2.2899,
  //               0.6548
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 118,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "Address",
  //             "polygon": [
  //               2.7519,
  //               0.5228,
  //               3.1631,
  //               0.5279,
  //               3.1631,
  //               0.6548,
  //               2.7519,
  //               0.6548
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 127,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "Invoice",
  //             "polygon": [
  //               3.3713,
  //               0.5279,
  //               3.7318,
  //               0.5279,
  //               3.7369,
  //               0.6497,
  //               3.3713,
  //               0.6446
  //             ],
  //             "confidence": 0.945,
  //             "span": {
  //               "offset": 135,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "Details",
  //             "polygon": [
  //               3.7572,
  //               0.5279,
  //               4.1075,
  //               0.5329,
  //               4.1075,
  //               0.6497,
  //               3.7572,
  //               0.6497
  //             ],
  //             "confidence": 0.991,
  //             "span": {
  //               "offset": 143,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "Order",
  //             "polygon": [
  //               4.8183,
  //               0.4923,
  //               5.0773,
  //               0.4974,
  //               5.0773,
  //               0.6294,
  //               4.8183,
  //               0.6243
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 151,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "No",
  //             "polygon": [
  //               5.0976,
  //               0.4974,
  //               5.2042,
  //               0.5025,
  //               5.2042,
  //               0.6294,
  //               5.0976,
  //               0.6294
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 157,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": ".:",
  //             "polygon": [
  //               5.2296,
  //               0.5025,
  //               5.3464,
  //               0.5025,
  //               5.3464,
  //               0.6294,
  //               5.2296,
  //               0.6294
  //             ],
  //             "confidence": 0.889,
  //             "span": {
  //               "offset": 160,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "5120189447",
  //             "polygon": [
  //               5.4022,
  //               0.5025,
  //               5.9709,
  //               0.5126,
  //               5.9709,
  //               0.6294,
  //               5.4022,
  //               0.6294
  //             ],
  //             "confidence": 0.976,
  //             "span": {
  //               "offset": 163,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "Asian",
  //             "polygon": [
  //               1.6247,
  //               0.7512,
  //               1.8634,
  //               0.7461,
  //               1.8634,
  //               0.8679,
  //               1.6247,
  //               0.8679
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 174,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "Paints",
  //             "polygon": [
  //               1.8888,
  //               0.7461,
  //               2.1731,
  //               0.7461,
  //               2.1731,
  //               0.8679,
  //               1.8888,
  //               0.8679
  //             ],
  //             "confidence": 0.99,
  //             "span": {
  //               "offset": 180,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "PPG",
  //             "polygon": [
  //               2.1934,
  //               0.7461,
  //               2.3863,
  //               0.7461,
  //               2.3863,
  //               0.8679,
  //               2.1934,
  //               0.8679
  //             ],
  //             "confidence": 0.99,
  //             "span": {
  //               "offset": 187,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "Pvt",
  //             "polygon": [
  //               2.4117,
  //               0.7461,
  //               2.559,
  //               0.7461,
  //               2.559,
  //               0.8679,
  //               2.4117,
  //               0.8679
  //             ],
  //             "confidence": 0.986,
  //             "span": {
  //               "offset": 191,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "Ltd-5555",
  //             "polygon": [
  //               2.5793,
  //               0.7461,
  //               3.0108,
  //               0.7461,
  //               3.0108,
  //               0.8679,
  //               2.5793,
  //               0.8679
  //             ],
  //             "confidence": 0.99,
  //             "span": {
  //               "offset": 195,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "Invoice",
  //             "polygon": [
  //               3.3713,
  //               0.7563,
  //               3.7369,
  //               0.7563,
  //               3.742,
  //               0.873,
  //               3.3713,
  //               0.8679
  //             ],
  //             "confidence": 0.942,
  //             "span": {
  //               "offset": 204,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "MH2351025135",
  //             "polygon": [
  //               3.8892,
  //               0.7766,
  //               4.6914,
  //               0.7715,
  //               4.6914,
  //               0.9035,
  //               3.8943,
  //               0.8933
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 212,
  //               "length": 12
  //             }
  //           },
  //           {
  //             "content": "Order",
  //             "polygon": [
  //               4.8133,
  //               0.7461,
  //               5.0773,
  //               0.7461,
  //               5.0824,
  //               0.8781,
  //               4.8183,
  //               0.8832
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 225,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "Date",
  //             "polygon": [
  //               5.1027,
  //               0.7512,
  //               5.3058,
  //               0.7512,
  //               5.3108,
  //               0.8781,
  //               5.1077,
  //               0.8781
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 231,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": ":",
  //             "polygon": [
  //               5.3312,
  //               0.7512,
  //               5.3921,
  //               0.7512,
  //               5.3972,
  //               0.8781,
  //               5.3362,
  //               0.8781
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 236,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "29.02.2024",
  //             "polygon": [
  //               5.4175,
  //               0.7512,
  //               5.9201,
  //               0.7563,
  //               5.9252,
  //               0.8832,
  //               5.4225,
  //               0.8781
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 238,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "B3",
  //             "polygon": [
  //               1.6247,
  //               0.8781,
  //               1.7263,
  //               0.8832,
  //               1.7314,
  //               1.0101,
  //               1.6247,
  //               1.005
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 249,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "Gala,Sairaj",
  //             "polygon": [
  //               1.7517,
  //               0.8832,
  //               2.234,
  //               0.8882,
  //               2.234,
  //               1.0101,
  //               1.7567,
  //               1.0101
  //             ],
  //             "confidence": 0.925,
  //             "span": {
  //               "offset": 252,
  //               "length": 11
  //             }
  //           },
  //           {
  //             "content": "Warehouse,",
  //             "polygon": [
  //               2.2594,
  //               0.8882,
  //               2.8331,
  //               0.8832,
  //               2.828,
  //               1.0101,
  //               2.2594,
  //               1.0101
  //             ],
  //             "confidence": 0.961,
  //             "span": {
  //               "offset": 264,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "No",
  //             "polygon": [
  //               3.3764,
  //               0.8882,
  //               3.4932,
  //               0.8933,
  //               3.4881,
  //               0.9948,
  //               3.3764,
  //               0.9898
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 275,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": ".:",
  //             "polygon": [
  //               3.5135,
  //               0.8933,
  //               3.5744,
  //               0.8933,
  //               3.5693,
  //               0.9948,
  //               3.5084,
  //               0.9948
  //             ],
  //             "confidence": 0.972,
  //             "span": {
  //               "offset": 278,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "Opp",
  //             "polygon": [
  //               1.6197,
  //               1.0101,
  //               1.8126,
  //               1.0151,
  //               1.8177,
  //               1.1573,
  //               1.6247,
  //               1.1573
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 281,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "All",
  //             "polygon": [
  //               1.8431,
  //               1.0151,
  //               1.9649,
  //               1.0151,
  //               1.9649,
  //               1.1522,
  //               1.8431,
  //               1.1573
  //             ],
  //             "confidence": 0.987,
  //             "span": {
  //               "offset": 285,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "Saints",
  //             "polygon": [
  //               1.9903,
  //               1.0202,
  //               2.2543,
  //               1.0202,
  //               2.2543,
  //               1.1522,
  //               1.9903,
  //               1.1522
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 289,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "High",
  //             "polygon": [
  //               2.2848,
  //               1.0202,
  //               2.5133,
  //               1.0202,
  //               2.5133,
  //               1.1522,
  //               2.2848,
  //               1.1522
  //             ],
  //             "confidence": 0.965,
  //             "span": {
  //               "offset": 296,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "School,",
  //             "polygon": [
  //               2.5386,
  //               1.0202,
  //               2.8484,
  //               1.0202,
  //               2.8433,
  //               1.1522,
  //               2.5386,
  //               1.1522
  //             ],
  //             "confidence": 0.943,
  //             "span": {
  //               "offset": 301,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "Lonar",
  //             "polygon": [
  //               2.8737,
  //               1.0202,
  //               3.1581,
  //               1.0151,
  //               3.153,
  //               1.1522,
  //               2.8737,
  //               1.1522
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 309,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "Delivery",
  //             "polygon": [
  //               4.8031,
  //               0.9847,
  //               5.1585,
  //               0.9847,
  //               5.1585,
  //               1.1573,
  //               4.8031,
  //               1.1573
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 315,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": ":",
  //             "polygon": [
  //               5.189,
  //               0.9847,
  //               5.2499,
  //               0.9847,
  //               5.2499,
  //               1.1573,
  //               5.189,
  //               1.1573
  //             ],
  //             "confidence": 0.926,
  //             "span": {
  //               "offset": 324,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "0402891877",
  //             "polygon": [
  //               5.4022,
  //               1.005,
  //               5.9658,
  //               1.0101,
  //               5.9658,
  //               1.1319,
  //               5.4022,
  //               1.1319
  //             ],
  //             "confidence": 0.984,
  //             "span": {
  //               "offset": 326,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "Road,-",
  //             "polygon": [
  //               1.6146,
  //               1.1522,
  //               1.9141,
  //               1.1522,
  //               1.9141,
  //               1.2689,
  //               1.6146,
  //               1.2639
  //             ],
  //             "confidence": 0.887,
  //             "span": {
  //               "offset": 337,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "Bhawale",
  //             "polygon": [
  //               1.6146,
  //               1.2892,
  //               2.0106,
  //               1.2842,
  //               2.0106,
  //               1.4161,
  //               1.6146,
  //               1.4212
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 344,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "Village,Bhiwandi",
  //             "polygon": [
  //               2.036,
  //               1.2842,
  //               2.8027,
  //               1.2842,
  //               2.8027,
  //               1.4161,
  //               2.036,
  //               1.4161
  //             ],
  //             "confidence": 0.951,
  //             "span": {
  //               "offset": 352,
  //               "length": 16
  //             }
  //           },
  //           {
  //             "content": "421302",
  //             "polygon": [
  //               2.8331,
  //               1.2842,
  //               3.1885,
  //               1.2791,
  //               3.1885,
  //               1.4212,
  //               2.8331,
  //               1.4161
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 369,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "Invoice",
  //             "polygon": [
  //               3.3713,
  //               1.1623,
  //               3.7267,
  //               1.1623,
  //               3.7267,
  //               1.2791,
  //               3.3713,
  //               1.2842
  //             ],
  //             "confidence": 0.962,
  //             "span": {
  //               "offset": 376,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "Date:",
  //             "polygon": [
  //               3.7521,
  //               1.1623,
  //               4.0517,
  //               1.1623,
  //               4.0517,
  //               1.2791,
  //               3.7521,
  //               1.2791
  //             ],
  //             "confidence": 0.99,
  //             "span": {
  //               "offset": 384,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "29.02.2024",
  //             "polygon": [
  //               4.138,
  //               1.1623,
  //               4.6813,
  //               1.1573,
  //               4.6813,
  //               1.2842,
  //               4.138,
  //               1.2791
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 390,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "Del.",
  //             "polygon": [
  //               4.8082,
  //               1.2537,
  //               4.9859,
  //               1.2588,
  //               4.991,
  //               1.3806,
  //               4.8133,
  //               1.3806
  //             ],
  //             "confidence": 0.987,
  //             "span": {
  //               "offset": 401,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "Date:",
  //             "polygon": [
  //               5.0113,
  //               1.2588,
  //               5.3159,
  //               1.2588,
  //               5.3159,
  //               1.3806,
  //               5.0113,
  //               1.3806
  //             ],
  //             "confidence": 0.945,
  //             "span": {
  //               "offset": 406,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "29.02.2024",
  //             "polygon": [
  //               5.3819,
  //               1.2588,
  //               5.8897,
  //               1.2588,
  //               5.8897,
  //               1.3857,
  //               5.3819,
  //               1.3806
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 412,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "ARegistered",
  //             "polygon": [
  //               0.0762,
  //               1.4567,
  //               0.5839,
  //               1.4618,
  //               0.5839,
  //               1.609,
  //               0.0762,
  //               1.6141
  //             ],
  //             "confidence": 0.573,
  //             "span": {
  //               "offset": 423,
  //               "length": 11
  //             }
  //           },
  //           {
  //             "content": "Address:",
  //             "polygon": [
  //               0.6144,
  //               1.4618,
  //               1.051,
  //               1.472,
  //               1.0459,
  //               1.6039,
  //               0.6144,
  //               1.609
  //             ],
  //             "confidence": 0.914,
  //             "span": {
  //               "offset": 435,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "Category",
  //             "polygon": [
  //               3.3713,
  //               1.4212,
  //               3.813,
  //               1.411,
  //               3.813,
  //               1.543,
  //               3.3713,
  //               1.5379
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 444,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": ":",
  //             "polygon": [
  //               3.8384,
  //               1.411,
  //               3.874,
  //               1.411,
  //               3.874,
  //               1.543,
  //               3.8384,
  //               1.543
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 453,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "B2B",
  //             "polygon": [
  //               3.8994,
  //               1.411,
  //               4.0974,
  //               1.4161,
  //               4.0974,
  //               1.5379,
  //               3.8994,
  //               1.543
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 455,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "Asan",
  //             "polygon": [
  //               0.0812,
  //               1.6192,
  //               0.3351,
  //               1.6141,
  //               0.3351,
  //               1.7359,
  //               0.0812,
  //               1.7359
  //             ],
  //             "confidence": 0.576,
  //             "span": {
  //               "offset": 459,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "Paints",
  //             "polygon": [
  //               0.3605,
  //               1.6141,
  //               0.6448,
  //               1.6141,
  //               0.6448,
  //               1.7359,
  //               0.3605,
  //               1.7359
  //             ],
  //             "confidence": 0.763,
  //             "span": {
  //               "offset": 464,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "PPG",
  //             "polygon": [
  //               0.6651,
  //               1.6141,
  //               0.8581,
  //               1.6141,
  //               0.8581,
  //               1.7308,
  //               0.6651,
  //               1.7308
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 471,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "Pvt",
  //             "polygon": [
  //               0.8784,
  //               1.6141,
  //               1.0358,
  //               1.6192,
  //               1.0358,
  //               1.7308,
  //               0.8834,
  //               1.7308
  //             ],
  //             "confidence": 0.948,
  //             "span": {
  //               "offset": 475,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "Ltd",
  //             "polygon": [
  //               1.0561,
  //               1.6192,
  //               1.2084,
  //               1.6192,
  //               1.2135,
  //               1.7308,
  //               1.0612,
  //               1.7308
  //             ],
  //             "confidence": 0.928,
  //             "span": {
  //               "offset": 479,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "Transaction",
  //             "polygon": [
  //               3.3713,
  //               1.5836,
  //               3.9552,
  //               1.5785,
  //               3.9552,
  //               1.7156,
  //               3.3713,
  //               1.7105
  //             ],
  //             "confidence": 0.973,
  //             "span": {
  //               "offset": 483,
  //               "length": 11
  //             }
  //           },
  //           {
  //             "content": "Type",
  //             "polygon": [
  //               3.9907,
  //               1.5785,
  //               4.2141,
  //               1.5785,
  //               4.2141,
  //               1.7156,
  //               3.9907,
  //               1.7156
  //             ],
  //             "confidence": 0.99,
  //             "span": {
  //               "offset": 495,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": ":",
  //             "polygon": [
  //               4.2395,
  //               1.5785,
  //               4.2649,
  //               1.5785,
  //               4.2649,
  //               1.7156,
  //               4.2395,
  //               1.7156
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 500,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "Bill",
  //             "polygon": [
  //               4.2903,
  //               1.5785,
  //               4.4629,
  //               1.5836,
  //               4.4629,
  //               1.7156,
  //               4.2903,
  //               1.7156
  //             ],
  //             "confidence": 0.965,
  //             "span": {
  //               "offset": 502,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "To",
  //             "polygon": [
  //               4.4883,
  //               1.5836,
  //               4.6102,
  //               1.5836,
  //               4.6102,
  //               1.7105,
  //               4.4883,
  //               1.7156
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 507,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "Int.",
  //             "polygon": [
  //               4.8133,
  //               1.5176,
  //               4.9554,
  //               1.5126,
  //               4.9554,
  //               1.6344,
  //               4.8133,
  //               1.6344
  //             ],
  //             "confidence": 0.941,
  //             "span": {
  //               "offset": 510,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "Ref.",
  //             "polygon": [
  //               4.9808,
  //               1.5126,
  //               5.1484,
  //               1.5126,
  //               5.1484,
  //               1.6344,
  //               4.9808,
  //               1.6344
  //             ],
  //             "confidence": 0.99,
  //             "span": {
  //               "offset": 515,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "No:",
  //             "polygon": [
  //               5.1738,
  //               1.5126,
  //               5.3718,
  //               1.5126,
  //               5.3718,
  //               1.6344,
  //               5.1738,
  //               1.6344
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 520,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "1360475518",
  //             "polygon": [
  //               5.4124,
  //               1.5126,
  //               5.9709,
  //               1.5176,
  //               5.9709,
  //               1.6344,
  //               5.4124,
  //               1.6344
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 524,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "IGA",
  //             "polygon": [
  //               0.0406,
  //               1.7359,
  //               0.2132,
  //               1.741,
  //               0.2132,
  //               1.8729,
  //               0.0406,
  //               1.8729
  //             ],
  //             "confidence": 0.526,
  //             "span": {
  //               "offset": 535,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "Shanti",
  //             "polygon": [
  //               0.2539,
  //               1.746,
  //               0.5534,
  //               1.7511,
  //               0.5534,
  //               1.8729,
  //               0.2539,
  //               1.8729
  //             ],
  //             "confidence": 0.555,
  //             "span": {
  //               "offset": 539,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "Nagar,",
  //             "polygon": [
  //               0.5788,
  //               1.7511,
  //               0.8784,
  //               1.7562,
  //               0.8784,
  //               1.878,
  //               0.5788,
  //               1.8729
  //             ],
  //             "confidence": 0.776,
  //             "span": {
  //               "offset": 546,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "Santacruz",
  //             "polygon": [
  //               0.9038,
  //               1.7562,
  //               1.3709,
  //               1.7511,
  //               1.3709,
  //               1.8831,
  //               0.9038,
  //               1.878
  //             ],
  //             "confidence": 0.961,
  //             "span": {
  //               "offset": 553,
  //               "length": 9
  //             }
  //           },
  //           {
  //             "content": "Ship",
  //             "polygon": [
  //               3.3713,
  //               1.7207,
  //               3.5896,
  //               1.7207,
  //               3.5896,
  //               1.8476,
  //               3.3713,
  //               1.8425
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 563,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "To",
  //             "polygon": [
  //               3.6201,
  //               1.7207,
  //               3.742,
  //               1.7207,
  //               3.742,
  //               1.8476,
  //               3.6201,
  //               1.8476
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 568,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "06L043980",
  //             "polygon": [
  //               5.3515,
  //               1.7663,
  //               5.8643,
  //               1.7613,
  //               5.8643,
  //               1.878,
  //               5.3515,
  //               1.8831
  //             ],
  //             "confidence": 0.948,
  //             "span": {
  //               "offset": 571,
  //               "length": 9
  //             }
  //           },
  //           {
  //             "content": "/",
  //             "polygon": [
  //               5.8897,
  //               1.7613,
  //               5.9455,
  //               1.7663,
  //               5.9455,
  //               1.878,
  //               5.8897,
  //               1.878
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 581,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "Ktast)",
  //             "polygon": [
  //               0.0559,
  //               1.8831,
  //               0.3503,
  //               1.8831,
  //               0.3503,
  //               2.0049,
  //               0.0559,
  //               1.9998
  //             ],
  //             "confidence": 0.578,
  //             "span": {
  //               "offset": 583,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "Reference",
  //             "polygon": [
  //               4.8082,
  //               1.8273,
  //               5.2601,
  //               1.812,
  //               5.2601,
  //               1.9491,
  //               4.8082,
  //               1.9389
  //             ],
  //             "confidence": 0.914,
  //             "span": {
  //               "offset": 590,
  //               "length": 9
  //             }
  //           },
  //           {
  //             "content": ":",
  //             "polygon": [
  //               5.2855,
  //               1.812,
  //               5.3565,
  //               1.807,
  //               5.3616,
  //               1.9491,
  //               5.2855,
  //               1.9491
  //             ],
  //             "confidence": 0.521,
  //             "span": {
  //               "offset": 600,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "PAN",
  //             "polygon": [
  //               1.5993,
  //               2.0049,
  //               1.7872,
  //               2.0049,
  //               1.7872,
  //               2.1216,
  //               1.5993,
  //               2.1216
  //             ],
  //             "confidence": 0.999,
  //             "span": {
  //               "offset": 602,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "No.",
  //             "polygon": [
  //               1.8278,
  //               2.0049,
  //               1.97,
  //               2.0049,
  //               1.97,
  //               2.1216,
  //               1.8278,
  //               2.1216
  //             ],
  //             "confidence": 0.999,
  //             "span": {
  //               "offset": 606,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": ":",
  //             "polygon": [
  //               1.9954,
  //               2.0049,
  //               2.0208,
  //               2.0049,
  //               2.0157,
  //               2.1216,
  //               1.9954,
  //               2.1216
  //             ],
  //             "confidence": 1,
  //             "span": {
  //               "offset": 610,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "AAJCA7128D",
  //             "polygon": [
  //               2.0411,
  //               2.0049,
  //               2.6351,
  //               2.0049,
  //               2.6351,
  //               2.1267,
  //               2.0411,
  //               2.1216
  //             ],
  //             "confidence": 0.158,
  //             "span": {
  //               "offset": 612,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "29.02.2024",
  //             "polygon": [
  //               5.3616,
  //               1.8932,
  //               5.8643,
  //               1.8983,
  //               5.8643,
  //               2.0049,
  //               5.3616,
  //               1.9998
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 623,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "Virtua:",
  //             "polygon": [
  //               0.0965,
  //               2.0201,
  //               0.5027,
  //               2.0201,
  //               0.5027,
  //               2.1318,
  //               0.0965,
  //               2.1318
  //             ],
  //             "confidence": 0.512,
  //             "span": {
  //               "offset": 634,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "400055",
  //             "polygon": [
  //               0.5636,
  //               2.0201,
  //               0.9038,
  //               2.0252,
  //               0.9038,
  //               2.1318,
  //               0.5636,
  //               2.1318
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 642,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "State:",
  //             "polygon": [
  //               1.6044,
  //               2.1369,
  //               1.9091,
  //               2.1369,
  //               1.9091,
  //               2.2485,
  //               1.6044,
  //               2.2485
  //             ],
  //             "confidence": 0.886,
  //             "span": {
  //               "offset": 649,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "Maharashtra",
  //             "polygon": [
  //               1.9294,
  //               2.1369,
  //               2.5183,
  //               2.1369,
  //               2.5234,
  //               2.2485,
  //               1.9294,
  //               2.2485
  //             ],
  //             "confidence": 0.991,
  //             "span": {
  //               "offset": 656,
  //               "length": 11
  //             }
  //           },
  //           {
  //             "content": "State",
  //             "polygon": [
  //               1.5993,
  //               2.2638,
  //               1.8431,
  //               2.2587,
  //               1.8431,
  //               2.3704,
  //               1.6044,
  //               2.3704
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 668,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "Code",
  //             "polygon": [
  //               1.8634,
  //               2.2587,
  //               2.0969,
  //               2.2587,
  //               2.102,
  //               2.3704,
  //               1.8634,
  //               2.3704
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 674,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": ":",
  //             "polygon": [
  //               2.1172,
  //               2.2587,
  //               2.1782,
  //               2.2587,
  //               2.1782,
  //               2.3704,
  //               2.1223,
  //               2.3704
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 679,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "27",
  //             "polygon": [
  //               2.1985,
  //               2.2587,
  //               2.3102,
  //               2.2587,
  //               2.3152,
  //               2.3704,
  //               2.2035,
  //               2.3704
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 681,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "GSTIN",
  //             "polygon": [
  //               1.5993,
  //               2.3602,
  //               1.8684,
  //               2.3602,
  //               1.8684,
  //               2.4719,
  //               1.5993,
  //               2.4719
  //             ],
  //             "confidence": 0.99,
  //             "span": {
  //               "offset": 684,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": ":",
  //             "polygon": [
  //               1.8989,
  //               2.3602,
  //               1.9548,
  //               2.3602,
  //               1.9548,
  //               2.4719,
  //               1.8989,
  //               2.4719
  //             ],
  //             "confidence": 0.932,
  //             "span": {
  //               "offset": 690,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "27AAJCA7128D1ZS",
  //             "polygon": [
  //               1.9751,
  //               2.3602,
  //               2.889,
  //               2.3551,
  //               2.889,
  //               2.4719,
  //               1.9751,
  //               2.4719
  //             ],
  //             "confidence": 0.963,
  //             "span": {
  //               "offset": 692,
  //               "length": 15
  //             }
  //           },
  //           {
  //             "content": "1360475518",
  //             "polygon": [
  //               3.5998,
  //               2.2688,
  //               4.3919,
  //               2.2739,
  //               4.3969,
  //               2.3856,
  //               3.5998,
  //               2.3856
  //             ],
  //             "confidence": 0.679,
  //             "span": {
  //               "offset": 708,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "IRN",
  //             "polygon": [
  //               0.1168,
  //               2.6038,
  //               0.2793,
  //               2.5988,
  //               0.2843,
  //               2.7104,
  //               0.1219,
  //               2.7104
  //             ],
  //             "confidence": 0.576,
  //             "span": {
  //               "offset": 719,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "No",
  //             "polygon": [
  //               0.3199,
  //               2.5988,
  //               0.4366,
  //               2.5988,
  //               0.4417,
  //               2.7155,
  //               0.3249,
  //               2.7104
  //             ],
  //             "confidence": 0.927,
  //             "span": {
  //               "offset": 723,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": ".:",
  //             "polygon": [
  //               0.462,
  //               2.5988,
  //               0.5433,
  //               2.5988,
  //               0.5483,
  //               2.7155,
  //               0.462,
  //               2.7155
  //             ],
  //             "confidence": 0.86,
  //             "span": {
  //               "offset": 726,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "997c0076d4aca66ab66779a21946a80da0f4ab21152e474626611391bf4eca1b",
  //             "polygon": [
  //               0.5687,
  //               2.5988,
  //               4.4375,
  //               2.5988,
  //               4.4426,
  //               2.7155,
  //               0.5737,
  //               2.7155
  //             ],
  //             "confidence": 0.86,
  //             "span": {
  //               "offset": 729,
  //               "length": 64
  //             }
  //           },
  //           {
  //             "content": "Acknowledgement",
  //             "polygon": [
  //               0.1168,
  //               2.7409,
  //               1.0612,
  //               2.7358,
  //               1.0612,
  //               2.8576,
  //               0.1219,
  //               2.8576
  //             ],
  //             "confidence": 0.629,
  //             "span": {
  //               "offset": 794,
  //               "length": 15
  //             }
  //           },
  //           {
  //             "content": "No.",
  //             "polygon": [
  //               1.0815,
  //               2.7358,
  //               1.249,
  //               2.7358,
  //               1.2541,
  //               2.8576,
  //               1.0865,
  //               2.8576
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 810,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": ":",
  //             "polygon": [
  //               1.2744,
  //               2.7358,
  //               1.3201,
  //               2.7358,
  //               1.3252,
  //               2.8576,
  //               1.2744,
  //               2.8576
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 814,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "122420388464075",
  //             "polygon": [
  //               1.3455,
  //               2.7358,
  //               2.2645,
  //               2.7307,
  //               2.2645,
  //               2.8576,
  //               1.3455,
  //               2.8576
  //             ],
  //             "confidence": 0.99,
  //             "span": {
  //               "offset": 816,
  //               "length": 15
  //             }
  //           },
  //           {
  //             "content": "Acknowledgement",
  //             "polygon": [
  //               2.2848,
  //               2.7307,
  //               3.219,
  //               2.7358,
  //               3.2241,
  //               2.8526,
  //               2.2899,
  //               2.8576
  //             ],
  //             "confidence": 0.975,
  //             "span": {
  //               "offset": 832,
  //               "length": 15
  //             }
  //           },
  //           {
  //             "content": "Date",
  //             "polygon": [
  //               3.2444,
  //               2.7358,
  //               3.4729,
  //               2.7358,
  //               3.4729,
  //               2.8526,
  //               3.2444,
  //               2.8526
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 848,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": ":",
  //             "polygon": [
  //               3.4983,
  //               2.7358,
  //               3.5389,
  //               2.7358,
  //               3.5389,
  //               2.8526,
  //               3.4983,
  //               2.8526
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 853,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "2024-02-29",
  //             "polygon": [
  //               3.5592,
  //               2.7358,
  //               4.1278,
  //               2.7409,
  //               4.1278,
  //               2.8526,
  //               3.5643,
  //               2.8526
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 855,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "QR",
  //             "polygon": [
  //               6.0014,
  //               2.7967,
  //               6.1384,
  //               2.7967,
  //               6.1384,
  //               2.9185,
  //               6.0014,
  //               2.9135
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 866,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "Type",
  //             "polygon": [
  //               6.1689,
  //               2.7967,
  //               6.4025,
  //               2.7967,
  //               6.4025,
  //               2.9185,
  //               6.1689,
  //               2.9185
  //             ],
  //             "confidence": 0.887,
  //             "span": {
  //               "offset": 869,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": ":",
  //             "polygon": [
  //               6.4228,
  //               2.7967,
  //               6.4583,
  //               2.7967,
  //               6.4583,
  //               2.9185,
  //               6.4278,
  //               2.9185
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 874,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "IRN",
  //             "polygon": [
  //               6.4786,
  //               2.7967,
  //               6.6411,
  //               2.8018,
  //               6.6411,
  //               2.9185,
  //               6.4837,
  //               2.9185
  //             ],
  //             "confidence": 0.931,
  //             "span": {
  //               "offset": 876,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "Bill",
  //             "polygon": [
  //               0.7921,
  //               3.0048,
  //               0.9799,
  //               3.0048,
  //               0.985,
  //               3.1165,
  //               0.7921,
  //               3.1165
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 880,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "To",
  //             "polygon": [
  //               1.0053,
  //               3.0048,
  //               1.1272,
  //               3.0048,
  //               1.1322,
  //               3.1216,
  //               1.0053,
  //               3.1165
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 885,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "Party",
  //             "polygon": [
  //               1.1576,
  //               3.0048,
  //               1.4572,
  //               3.0048,
  //               1.4623,
  //               3.1266,
  //               1.1627,
  //               3.1216
  //             ],
  //             "confidence": 0.988,
  //             "span": {
  //               "offset": 888,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "Ship",
  //             "polygon": [
  //               2.955,
  //               2.9997,
  //               3.1885,
  //               2.9997,
  //               3.1936,
  //               3.1266,
  //               2.955,
  //               3.1216
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 894,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "To",
  //             "polygon": [
  //               3.2292,
  //               2.9997,
  //               3.3612,
  //               2.9997,
  //               3.3612,
  //               3.1266,
  //               3.2342,
  //               3.1266
  //             ],
  //             "confidence": 0.996,
  //             "span": {
  //               "offset": 899,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "Party",
  //             "polygon": [
  //               3.3865,
  //               2.9997,
  //               3.6861,
  //               3.0048,
  //               3.6912,
  //               3.1266,
  //               3.3865,
  //               3.1266
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 902,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "Details",
  //             "polygon": [
  //               5.1433,
  //               3.0048,
  //               5.5342,
  //               3.0048,
  //               5.5342,
  //               3.1216,
  //               5.1433,
  //               3.1114
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 908,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "Remarks",
  //             "polygon": [
  //               6.6614,
  //               3.0099,
  //               7.1539,
  //               3.0099,
  //               7.159,
  //               3.1266,
  //               6.6665,
  //               3.1266
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 916,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "Customer",
  //             "polygon": [
  //               0.1015,
  //               3.1419,
  //               0.589,
  //               3.152,
  //               0.5839,
  //               3.2535,
  //               0.1015,
  //               3.2485
  //             ],
  //             "confidence": 0.983,
  //             "span": {
  //               "offset": 924,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "0000566518",
  //             "polygon": [
  //               0.8784,
  //               3.1419,
  //               1.4978,
  //               3.1419,
  //               1.5029,
  //               3.2485,
  //               0.8784,
  //               3.2535
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 933,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "Customer",
  //             "polygon": [
  //               2.2239,
  //               3.152,
  //               2.7163,
  //               3.152,
  //               2.7163,
  //               3.2535,
  //               2.2289,
  //               3.2485
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 944,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "1030109098",
  //             "polygon": [
  //               3.021,
  //               3.1419,
  //               3.6303,
  //               3.1368,
  //               3.6303,
  //               3.2535,
  //               3.0261,
  //               3.2535
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 953,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "Terms",
  //             "polygon": [
  //               4.4934,
  //               3.1419,
  //               4.7676,
  //               3.1419,
  //               4.7726,
  //               3.2637,
  //               4.4985,
  //               3.2586
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 964,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "of",
  //             "polygon": [
  //               4.793,
  //               3.1419,
  //               4.8894,
  //               3.1419,
  //               4.8894,
  //               3.2637,
  //               4.793,
  //               3.2637
  //             ],
  //             "confidence": 0.896,
  //             "span": {
  //               "offset": 970,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "Payment",
  //             "polygon": [
  //               4.9148,
  //               3.1419,
  //               5.3159,
  //               3.1419,
  //               5.3159,
  //               3.2688,
  //               4.9148,
  //               3.2637
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 973,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": ":",
  //             "polygon": [
  //               5.3362,
  //               3.1419,
  //               5.3718,
  //               3.1419,
  //               5.3718,
  //               3.2688,
  //               5.3413,
  //               3.2688
  //             ],
  //             "confidence": 0.961,
  //             "span": {
  //               "offset": 981,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "Pmt",
  //             "polygon": [
  //               5.3972,
  //               3.1419,
  //               5.5901,
  //               3.1419,
  //               5.5901,
  //               3.2688,
  //               5.3972,
  //               3.2688
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 983,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "due",
  //             "polygon": [
  //               5.6104,
  //               3.1419,
  //               5.7983,
  //               3.1419,
  //               5.7983,
  //               3.2637,
  //               5.6104,
  //               3.2637
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 987,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "within",
  //             "polygon": [
  //               5.8186,
  //               3.1419,
  //               6.1181,
  //               3.1469,
  //               6.1181,
  //               3.2586,
  //               5.8236,
  //               3.2637
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 991,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "LARSEN",
  //             "polygon": [
  //               0.1015,
  //               3.2637,
  //               0.4468,
  //               3.2688,
  //               0.4468,
  //               3.3703,
  //               0.1015,
  //               3.3753
  //             ],
  //             "confidence": 0.567,
  //             "span": {
  //               "offset": 998,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "&",
  //             "polygon": [
  //               0.4925,
  //               3.2688,
  //               0.5534,
  //               3.2688,
  //               0.5585,
  //               3.3703,
  //               0.4925,
  //               3.3703
  //             ],
  //             "confidence": 0.948,
  //             "span": {
  //               "offset": 1005,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "TOUBRO",
  //             "polygon": [
  //               0.589,
  //               3.2688,
  //               0.9647,
  //               3.2688,
  //               0.9698,
  //               3.3753,
  //               0.594,
  //               3.3703
  //             ],
  //             "confidence": 0.86,
  //             "span": {
  //               "offset": 1007,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "LIMITED",
  //             "polygon": [
  //               1.0002,
  //               3.2688,
  //               1.3709,
  //               3.2637,
  //               1.3759,
  //               3.3804,
  //               1.0053,
  //               3.3753
  //             ],
  //             "confidence": 0.663,
  //             "span": {
  //               "offset": 1014,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "LARSEN",
  //             "polygon": [
  //               2.234,
  //               3.2688,
  //               2.5843,
  //               3.2688,
  //               2.5843,
  //               3.3753,
  //               2.234,
  //               3.3753
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 1022,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "&",
  //             "polygon": [
  //               2.63,
  //               3.2688,
  //               2.691,
  //               3.2688,
  //               2.691,
  //               3.3753,
  //               2.63,
  //               3.3753
  //             ],
  //             "confidence": 0.948,
  //             "span": {
  //               "offset": 1029,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "TOUBRO",
  //             "polygon": [
  //               2.7214,
  //               3.2688,
  //               3.1022,
  //               3.2637,
  //               3.1022,
  //               3.3753,
  //               2.7214,
  //               3.3753
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 1031,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "LIMITED",
  //             "polygon": [
  //               3.1378,
  //               3.2637,
  //               3.5033,
  //               3.2637,
  //               3.5033,
  //               3.3804,
  //               3.1378,
  //               3.3753
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 1038,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "A",
  //             "polygon": [
  //               0.1269,
  //               3.3957,
  //               0.1879,
  //               3.3957,
  //               0.1879,
  //               3.5124,
  //               0.1269,
  //               3.5124
  //             ],
  //             "confidence": 0.876,
  //             "span": {
  //               "offset": 1046,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "b:",
  //             "polygon": [
  //               0.2234,
  //               3.3957,
  //               0.3199,
  //               3.3957,
  //               0.3199,
  //               3.5124,
  //               0.2234,
  //               3.5124
  //             ],
  //             "confidence": 0.62,
  //             "span": {
  //               "offset": 1048,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "7,",
  //             "polygon": [
  //               0.3402,
  //               3.3957,
  //               0.4163,
  //               3.3957,
  //               0.4214,
  //               3.5124,
  //               0.3402,
  //               3.5124
  //             ],
  //             "confidence": 0.533,
  //             "span": {
  //               "offset": 1051,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "8,",
  //             "polygon": [
  //               0.4417,
  //               3.3957,
  //               0.5331,
  //               3.3957,
  //               0.5331,
  //               3.5175,
  //               0.4417,
  //               3.5124
  //             ],
  //             "confidence": 0.601,
  //             "span": {
  //               "offset": 1054,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "10,",
  //             "polygon": [
  //               0.5585,
  //               3.3957,
  //               0.6956,
  //               3.3957,
  //               0.6956,
  //               3.5175,
  //               0.5585,
  //               3.5175
  //             ],
  //             "confidence": 0.616,
  //             "span": {
  //               "offset": 1057,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "11,",
  //             "polygon": [
  //               0.721,
  //               3.3957,
  //               0.8378,
  //               3.3957,
  //               0.8378,
  //               3.5175,
  //               0.721,
  //               3.5175
  //             ],
  //             "confidence": 0.764,
  //             "span": {
  //               "offset": 1061,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "LARSEN",
  //             "polygon": [
  //               0.8581,
  //               3.3957,
  //               1.2135,
  //               3.3957,
  //               1.2185,
  //               3.5124,
  //               0.8631,
  //               3.5175
  //             ],
  //             "confidence": 0.585,
  //             "span": {
  //               "offset": 1065,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "TOUBRO",
  //             "polygon": [
  //               1.2592,
  //               3.3957,
  //               1.6501,
  //               3.3957,
  //               1.6501,
  //               3.5124,
  //               1.2642,
  //               3.5124
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 1072,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "LI",
  //             "polygon": [
  //               1.6806,
  //               3.3957,
  //               1.772,
  //               3.3957,
  //               1.7771,
  //               3.5124,
  //               1.6806,
  //               3.5124
  //             ],
  //             "confidence": 0.944,
  //             "span": {
  //               "offset": 1079,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "DEFENCE",
  //             "polygon": [
  //               2.2645,
  //               3.4007,
  //               2.691,
  //               3.3957,
  //               2.696,
  //               3.5175,
  //               2.2645,
  //               3.5124
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 1082,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "DIVISION,",
  //             "polygon": [
  //               2.7163,
  //               3.3957,
  //               3.153,
  //               3.3906,
  //               3.153,
  //               3.5175,
  //               2.7163,
  //               3.5175
  //             ],
  //             "confidence": 0.946,
  //             "span": {
  //               "offset": 1090,
  //               "length": 9
  //             }
  //           },
  //           {
  //             "content": "PLOT",
  //             "polygon": [
  //               3.1784,
  //               3.3906,
  //               3.4221,
  //               3.3906,
  //               3.4221,
  //               3.5175,
  //               3.1784,
  //               3.5175
  //             ],
  //             "confidence": 0.99,
  //             "span": {
  //               "offset": 1100,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "NO",
  //             "polygon": [
  //               3.4424,
  //               3.3906,
  //               3.5643,
  //               3.3906,
  //               3.5693,
  //               3.5175,
  //               3.4475,
  //               3.5175
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 1105,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": ".:",
  //             "polygon": [
  //               3.5896,
  //               3.3906,
  //               3.6455,
  //               3.3906,
  //               3.6506,
  //               3.5175,
  //               3.5947,
  //               3.5175
  //             ],
  //             "confidence": 0.982,
  //             "span": {
  //               "offset": 1108,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "A5,",
  //             "polygon": [
  //               3.6709,
  //               3.3906,
  //               3.8181,
  //               3.3906,
  //               3.8181,
  //               3.5175,
  //               3.676,
  //               3.5175
  //             ],
  //             "confidence": 0.918,
  //             "span": {
  //               "offset": 1111,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "A7,",
  //             "polygon": [
  //               3.8384,
  //               3.3906,
  //               3.9958,
  //               3.3906,
  //               3.9958,
  //               3.5175,
  //               3.8435,
  //               3.5175
  //             ],
  //             "confidence": 0.895,
  //             "span": {
  //               "offset": 1115,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "&",
  //             "polygon": [
  //               4.0212,
  //               3.3906,
  //               4.0821,
  //               3.3906,
  //               4.0872,
  //               3.5175,
  //               4.0212,
  //               3.5175
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 1119,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "A11",
  //             "polygon": [
  //               4.1075,
  //               3.3906,
  //               4.2903,
  //               3.3906,
  //               4.2903,
  //               3.5175,
  //               4.1126,
  //               3.5175
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 1121,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "60",
  //             "polygon": [
  //               4.4934,
  //               3.2688,
  //               4.6,
  //               3.2688,
  //               4.6,
  //               3.4007,
  //               4.4934,
  //               3.4007
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 1125,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "days",
  //             "polygon": [
  //               4.6254,
  //               3.2688,
  //               4.8387,
  //               3.2688,
  //               4.8437,
  //               3.4007,
  //               4.6254,
  //               3.4007
  //             ],
  //             "confidence": 0.991,
  //             "span": {
  //               "offset": 1128,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "of",
  //             "polygon": [
  //               4.864,
  //               3.2688,
  //               4.9504,
  //               3.2688,
  //               4.9504,
  //               3.4007,
  //               4.8691,
  //               3.4007
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 1133,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "invoice",
  //             "polygon": [
  //               4.9757,
  //               3.2738,
  //               5.3159,
  //               3.2738,
  //               5.321,
  //               3.3957,
  //               4.9757,
  //               3.4007
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 1136,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "date",
  //             "polygon": [
  //               5.3413,
  //               3.2738,
  //               5.5596,
  //               3.2738,
  //               5.5596,
  //               3.4007,
  //               5.3413,
  //               3.3957
  //             ],
  //             "confidence": 0.985,
  //             "span": {
  //               "offset": 1144,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "Terms",
  //             "polygon": [
  //               4.4934,
  //               3.4007,
  //               4.7726,
  //               3.4007,
  //               4.7726,
  //               3.5327,
  //               4.4985,
  //               3.5276
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 1149,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "Of",
  //             "polygon": [
  //               4.798,
  //               3.4007,
  //               4.9047,
  //               3.4007,
  //               4.9097,
  //               3.5327,
  //               4.798,
  //               3.5327
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 1155,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "Delivery:",
  //             "polygon": [
  //               4.93,
  //               3.4007,
  //               5.3312,
  //               3.4058,
  //               5.3362,
  //               3.5327,
  //               4.9351,
  //               3.5327
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 1158,
  //               "length": 9
  //             }
  //           },
  //           {
  //             "content": "D02",
  //             "polygon": [
  //               5.3565,
  //               3.4058,
  //               5.5596,
  //               3.4058,
  //               5.5647,
  //               3.5327,
  //               5.3616,
  //               3.5327
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 1168,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "DEHENCI",
  //             "polygon": [
  //               0.0965,
  //               3.5327,
  //               0.5331,
  //               3.5378,
  //               0.5331,
  //               3.6494,
  //               0.0965,
  //               3.6545
  //             ],
  //             "confidence": 0.604,
  //             "span": {
  //               "offset": 1172,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "IC,",
  //             "polygon": [
  //               0.5534,
  //               3.5378,
  //               0.6651,
  //               3.5378,
  //               0.6651,
  //               3.6494,
  //               0.5534,
  //               3.6494
  //             ],
  //             "confidence": 0.85,
  //             "span": {
  //               "offset": 1180,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "MIDC,",
  //             "polygon": [
  //               0.6854,
  //               3.5378,
  //               0.985,
  //               3.5378,
  //               0.985,
  //               3.6444,
  //               0.6905,
  //               3.6494
  //             ],
  //             "confidence": 0.926,
  //             "span": {
  //               "offset": 1184,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "TALEGAON",
  //             "polygon": [
  //               1.0053,
  //               3.5378,
  //               1.5029,
  //               3.5327,
  //               1.5029,
  //               3.6444,
  //               1.0053,
  //               3.6444
  //             ],
  //             "confidence": 0.945,
  //             "span": {
  //               "offset": 1190,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "TALEGAON",
  //             "polygon": [
  //               2.2442,
  //               3.5327,
  //               2.7367,
  //               3.5327,
  //               2.7417,
  //               3.6494,
  //               2.2442,
  //               3.6444
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 1199,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "MIDC,",
  //             "polygon": [
  //               2.7773,
  //               3.5327,
  //               3.0616,
  //               3.5327,
  //               3.0616,
  //               3.6494,
  //               2.7773,
  //               3.6494
  //             ],
  //             "confidence": 0.962,
  //             "span": {
  //               "offset": 1208,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "VILLAGE",
  //             "polygon": [
  //               3.0819,
  //               3.5327,
  //               3.4678,
  //               3.5327,
  //               3.4678,
  //               3.6444,
  //               3.087,
  //               3.6494
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 1214,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "NAVLAK",
  //             "polygon": [
  //               3.4881,
  //               3.5327,
  //               3.879,
  //               3.5327,
  //               3.8841,
  //               3.6444,
  //               3.4932,
  //               3.6444
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 1222,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "Due",
  //             "polygon": [
  //               4.4883,
  //               3.5327,
  //               4.6762,
  //               3.5327,
  //               4.6813,
  //               3.6596,
  //               4.4934,
  //               3.6647
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 1229,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "Date",
  //             "polygon": [
  //               4.7016,
  //               3.5327,
  //               4.9097,
  //               3.5327,
  //               4.9097,
  //               3.6596,
  //               4.7066,
  //               3.6596
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 1233,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": ":",
  //             "polygon": [
  //               4.93,
  //               3.5327,
  //               4.9757,
  //               3.5327,
  //               4.9757,
  //               3.6596,
  //               4.9351,
  //               3.6596
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 1238,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "29.04.2024",
  //             "polygon": [
  //               4.996,
  //               3.5327,
  //               5.5089,
  //               3.5378,
  //               5.5139,
  //               3.6596,
  //               5.0011,
  //               3.6596
  //             ],
  //             "confidence": 0.988,
  //             "span": {
  //               "offset": 1240,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "420",
  //             "polygon": [
  //               5.8693,
  //               3.5073,
  //               6.2349,
  //               3.3804,
  //               6.2857,
  //               3.5733,
  //               5.9303,
  //               3.69
  //             ],
  //             "confidence": 0.905,
  //             "span": {
  //               "offset": 1251,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "Uhr",
  //             "polygon": [
  //               6.3314,
  //               3.355,
  //               6.6259,
  //               3.2688,
  //               6.6665,
  //               3.4718,
  //               6.3821,
  //               3.5479
  //             ],
  //             "confidence": 0.169,
  //             "span": {
  //               "offset": 1255,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "Received",
  //             "polygon": [
  //               6.7782,
  //               3.2332,
  //               7.5296,
  //               3.0911,
  //               7.5499,
  //               3.3043,
  //               6.8137,
  //               3.4363
  //             ],
  //             "confidence": 0.936,
  //             "span": {
  //               "offset": 1259,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "by",
  //             "polygon": [
  //               7.6819,
  //               3.0708,
  //               7.8901,
  //               3.0505,
  //               7.9003,
  //               3.2637,
  //               7.6972,
  //               3.2891
  //             ],
  //             "confidence": 0.983,
  //             "span": {
  //               "offset": 1268,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "Pone,",
  //             "polygon": [
  //               0.0965,
  //               3.6647,
  //               0.3656,
  //               3.6697,
  //               0.3656,
  //               3.7763,
  //               0.0965,
  //               3.7713
  //             ],
  //             "confidence": 0.544,
  //             "span": {
  //               "offset": 1271,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "Maharashtra,",
  //             "polygon": [
  //               0.3859,
  //               3.6697,
  //               1.0002,
  //               3.6697,
  //               1.0002,
  //               3.7814,
  //               0.3859,
  //               3.7763
  //             ],
  //             "confidence": 0.857,
  //             "span": {
  //               "offset": 1277,
  //               "length": 12
  //             }
  //           },
  //           {
  //             "content": "410507",
  //             "polygon": [
  //               1.0205,
  //               3.6697,
  //               1.3607,
  //               3.6647,
  //               1.3607,
  //               3.7814,
  //               1.0205,
  //               3.7814
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 1290,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "UMBRE,",
  //             "polygon": [
  //               2.234,
  //               3.6647,
  //               2.5996,
  //               3.6647,
  //               2.6046,
  //               3.7814,
  //               2.234,
  //               3.7814
  //             ],
  //             "confidence": 0.987,
  //             "span": {
  //               "offset": 1297,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "TALUKA",
  //             "polygon": [
  //               2.625,
  //               3.6647,
  //               2.9956,
  //               3.6596,
  //               2.9956,
  //               3.7814,
  //               2.625,
  //               3.7814
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 1304,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "MAVAL,",
  //             "polygon": [
  //               3.021,
  //               3.6596,
  //               3.3815,
  //               3.6596,
  //               3.3815,
  //               3.7814,
  //               3.021,
  //               3.7814
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 1311,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "DISTRICT",
  //             "polygon": [
  //               3.4069,
  //               3.6596,
  //               3.8232,
  //               3.6596,
  //               3.8232,
  //               3.7814,
  //               3.4069,
  //               3.7814
  //             ],
  //             "confidence": 0.991,
  //             "span": {
  //               "offset": 1318,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "PUNE",
  //             "polygon": [
  //               3.8486,
  //               3.6596,
  //               4.1126,
  //               3.6596,
  //               4.1126,
  //               3.7814,
  //               3.8486,
  //               3.7814
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 1327,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "Gross",
  //             "polygon": [
  //               4.4934,
  //               3.6697,
  //               4.7422,
  //               3.6697,
  //               4.7422,
  //               3.8017,
  //               4.4934,
  //               3.8017
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 1332,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "Weight:3157.920",
  //             "polygon": [
  //               4.7676,
  //               3.6697,
  //               5.5495,
  //               3.6697,
  //               5.5495,
  //               3.7916,
  //               4.7676,
  //               3.8017
  //             ],
  //             "confidence": 0.976,
  //             "span": {
  //               "offset": 1338,
  //               "length": 15
  //             }
  //           },
  //           {
  //             "content": "KG",
  //             "polygon": [
  //               5.5749,
  //               3.6697,
  //               5.7069,
  //               3.6697,
  //               5.7069,
  //               3.7916,
  //               5.5749,
  //               3.7916
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 1354,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "point",
  //             "polygon": [
  //               6.0267,
  //               3.6545,
  //               6.4685,
  //               3.5124,
  //               6.5142,
  //               3.685,
  //               6.0877,
  //               3.822
  //             ],
  //             "confidence": 0.653,
  //             "span": {
  //               "offset": 1357,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "shop2",
  //             "polygon": [
  //               6.6259,
  //               3.4769,
  //               7.1488,
  //               3.3804,
  //               7.1844,
  //               3.5733,
  //               6.6716,
  //               3.6494
  //             ],
  //             "confidence": 0.617,
  //             "span": {
  //               "offset": 1363,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "TALL",
  //             "polygon": [
  //               0.1117,
  //               3.7966,
  //               0.3148,
  //               3.8017,
  //               0.3148,
  //               3.9134,
  //               0.1117,
  //               3.9134
  //             ],
  //             "confidence": 0.527,
  //             "span": {
  //               "offset": 1369,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "GAON",
  //             "polygon": [
  //               0.3351,
  //               3.8017,
  //               0.6093,
  //               3.8068,
  //               0.6093,
  //               3.9134,
  //               0.3351,
  //               3.9134
  //             ],
  //             "confidence": 0.931,
  //             "span": {
  //               "offset": 1374,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "410507",
  //             "polygon": [
  //               0.6499,
  //               3.8068,
  //               1.0002,
  //               3.8017,
  //               1.0002,
  //               3.9134,
  //               0.6499,
  //               3.9134
  //             ],
  //             "confidence": 0.961,
  //             "span": {
  //               "offset": 1379,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "UMBRE",
  //             "polygon": [
  //               2.234,
  //               3.8017,
  //               2.5742,
  //               3.8017,
  //               2.5742,
  //               3.9134,
  //               2.2391,
  //               3.9134
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 1386,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "410507",
  //             "polygon": [
  //               2.5996,
  //               3.8017,
  //               2.9499,
  //               3.8017,
  //               2.9499,
  //               3.9134,
  //               2.6046,
  //               3.9134
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 1392,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "Volume:2160",
  //             "polygon": [
  //               4.4934,
  //               3.8017,
  //               5.0925,
  //               3.8017,
  //               5.0976,
  //               3.9337,
  //               4.4934,
  //               3.9337
  //             ],
  //             "confidence": 0.948,
  //             "span": {
  //               "offset": 1399,
  //               "length": 11
  //             }
  //           },
  //           {
  //             "content": "Kg/Lt/M",
  //             "polygon": [
  //               5.1179,
  //               3.8017,
  //               5.4784,
  //               3.8068,
  //               5.4835,
  //               3.9337,
  //               5.123,
  //               3.9337
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 1411,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "Đại",
  //             "polygon": [
  //               0.1066,
  //               3.9388,
  //               0.2336,
  //               3.9388,
  //               0.2386,
  //               4.0504,
  //               0.1117,
  //               4.0504
  //             ],
  //             "confidence": 0.508,
  //             "span": {
  //               "offset": 1419,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "No:",
  //             "polygon": [
  //               0.2589,
  //               3.9388,
  //               0.4519,
  //               3.9388,
  //               0.457,
  //               4.0453,
  //               0.2589,
  //               4.0504
  //             ],
  //             "confidence": 0.539,
  //             "span": {
  //               "offset": 1423,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "2114669215",
  //             "polygon": [
  //               0.4773,
  //               3.9388,
  //               1.0459,
  //               3.9438,
  //               1.051,
  //               4.0453,
  //               0.4773,
  //               4.0453
  //             ],
  //             "confidence": 0.961,
  //             "span": {
  //               "offset": 1427,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "Tel",
  //             "polygon": [
  //               2.2391,
  //               3.9286,
  //               2.366,
  //               3.9337,
  //               2.366,
  //               4.0504,
  //               2.2391,
  //               4.0504
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 1438,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "No:",
  //             "polygon": [
  //               2.3863,
  //               3.9337,
  //               2.559,
  //               3.9337,
  //               2.564,
  //               4.0453,
  //               2.3914,
  //               4.0504
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 1442,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "7447413004",
  //             "polygon": [
  //               2.5843,
  //               3.9337,
  //               3.153,
  //               3.9337,
  //               3.153,
  //               4.0453,
  //               2.5843,
  //               4.0453
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 1446,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "Net",
  //             "polygon": [
  //               4.4883,
  //               3.9235,
  //               4.6305,
  //               3.9286,
  //               4.6356,
  //               4.0504,
  //               4.4934,
  //               4.0352
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 1457,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "Weight:2909.520",
  //             "polygon": [
  //               4.6609,
  //               3.9337,
  //               5.4175,
  //               3.9286,
  //               5.4378,
  //               4.0707,
  //               4.666,
  //               4.0555
  //             ],
  //             "confidence": 0.68,
  //             "span": {
  //               "offset": 1461,
  //               "length": 15
  //             }
  //           },
  //           {
  //             "content": "KG",
  //             "polygon": [
  //               5.4479,
  //               3.9286,
  //               5.6155,
  //               3.9134,
  //               5.6409,
  //               4.0606,
  //               5.4682,
  //               4.0707
  //             ],
  //             "confidence": 0.349,
  //             "span": {
  //               "offset": 1477,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "CEIVED",
  //             "polygon": [
  //               5.651,
  //               3.9083,
  //               6.1689,
  //               3.8169,
  //               6.2044,
  //               3.9844,
  //               5.6764,
  //               4.0555
  //             ],
  //             "confidence": 0.891,
  //             "span": {
  //               "offset": 1480,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "SIGN",
  //             "polygon": [
  //               6.2451,
  //               3.8017,
  //               6.57,
  //               3.7103,
  //               6.6106,
  //               3.8931,
  //               6.2806,
  //               3.9692
  //             ],
  //             "confidence": 0.951,
  //             "span": {
  //               "offset": 1487,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "(Ny)",
  //             "polygon": [
  //               6.6259,
  //               3.6951,
  //               7.0524,
  //               3.5479,
  //               7.1031,
  //               3.7459,
  //               6.6665,
  //               3.8778
  //             ],
  //             "confidence": 0.159,
  //             "span": {
  //               "offset": 1492,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "protrom",
  //             "polygon": [
  //               6.5446,
  //               3.954,
  //               7.2554,
  //               3.7713,
  //               7.3164,
  //               3.9641,
  //               6.6055,
  //               4.1316
  //             ],
  //             "confidence": 0.232,
  //             "span": {
  //               "offset": 1497,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "mohite",
  //             "polygon": [
  //               7.4027,
  //               3.7256,
  //               8.0475,
  //               3.4566,
  //               8.1033,
  //               3.685,
  //               7.4636,
  //               3.9185
  //             ],
  //             "confidence": 0.636,
  //             "span": {
  //               "offset": 1505,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "PAN",
  //             "polygon": [
  //               0.0965,
  //               4.0656,
  //               0.2894,
  //               4.0656,
  //               0.2894,
  //               4.1824,
  //               0.0965,
  //               4.1824
  //             ],
  //             "confidence": 0.961,
  //             "span": {
  //               "offset": 1512,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "AAACI",
  //             "polygon": [
  //               0.3706,
  //               4.0656,
  //               0.6753,
  //               4.0707,
  //               0.6753,
  //               4.1824,
  //               0.3757,
  //               4.1824
  //             ],
  //             "confidence": 0.873,
  //             "span": {
  //               "offset": 1516,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "0140P",
  //             "polygon": [
  //               0.6956,
  //               4.0707,
  //               0.9901,
  //               4.0707,
  //               0.9901,
  //               4.1824,
  //               0.7007,
  //               4.1824
  //             ],
  //             "confidence": 0.961,
  //             "span": {
  //               "offset": 1522,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "State",
  //             "polygon": [
  //               2.2391,
  //               4.0656,
  //               2.4726,
  //               4.0656,
  //               2.4726,
  //               4.1875,
  //               2.2391,
  //               4.1875
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 1528,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "Code",
  //             "polygon": [
  //               2.4929,
  //               4.0656,
  //               2.7367,
  //               4.0656,
  //               2.7367,
  //               4.1824,
  //               2.498,
  //               4.1875
  //             ],
  //             "confidence": 0.973,
  //             "span": {
  //               "offset": 1534,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": ":",
  //             "polygon": [
  //               2.757,
  //               4.0656,
  //               2.7976,
  //               4.0656,
  //               2.7976,
  //               4.1824,
  //               2.762,
  //               4.1824
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 1539,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "27",
  //             "polygon": [
  //               2.823,
  //               4.0656,
  //               2.9397,
  //               4.0656,
  //               2.9397,
  //               4.1824,
  //               2.823,
  //               4.1824
  //             ],
  //             "confidence": 0.996,
  //             "span": {
  //               "offset": 1541,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "Place",
  //             "polygon": [
  //               0.0965,
  //               4.1976,
  //               0.3402,
  //               4.2027,
  //               0.3402,
  //               4.3296,
  //               0.1015,
  //               4.3296
  //             ],
  //             "confidence": 0.597,
  //             "span": {
  //               "offset": 1544,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "of",
  //             "polygon": [
  //               0.3605,
  //               4.2027,
  //               0.4671,
  //               4.2027,
  //               0.4671,
  //               4.3296,
  //               0.3656,
  //               4.3296
  //             ],
  //             "confidence": 0.559,
  //             "span": {
  //               "offset": 1550,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "Supply",
  //             "polygon": [
  //               0.4925,
  //               4.2027,
  //               0.7971,
  //               4.2078,
  //               0.7971,
  //               4.3296,
  //               0.4925,
  //               4.3296
  //             ],
  //             "confidence": 0.961,
  //             "span": {
  //               "offset": 1553,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": ":",
  //             "polygon": [
  //               0.8225,
  //               4.2078,
  //               0.853,
  //               4.2078,
  //               0.853,
  //               4.3296,
  //               0.8225,
  //               4.3296
  //             ],
  //             "confidence": 0.862,
  //             "span": {
  //               "offset": 1560,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "Maharashtra",
  //             "polygon": [
  //               0.8784,
  //               4.2078,
  //               1.4724,
  //               4.2078,
  //               1.4724,
  //               4.3245,
  //               0.8784,
  //               4.3296
  //             ],
  //             "confidence": 0.968,
  //             "span": {
  //               "offset": 1562,
  //               "length": 11
  //             }
  //           },
  //           {
  //             "content": "GSTIN/UniqueID",
  //             "polygon": [
  //               2.234,
  //               4.2027,
  //               2.9854,
  //               4.2027,
  //               2.9854,
  //               4.3347,
  //               2.2391,
  //               4.3194
  //             ],
  //             "confidence": 0.569,
  //             "span": {
  //               "offset": 1574,
  //               "length": 14
  //             }
  //           },
  //           {
  //             "content": ":",
  //             "polygon": [
  //               3.0108,
  //               4.2027,
  //               3.0616,
  //               4.2027,
  //               3.0616,
  //               4.3347,
  //               3.0108,
  //               4.3347
  //             ],
  //             "confidence": 0.926,
  //             "span": {
  //               "offset": 1589,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "Currency",
  //             "polygon": [
  //               4.4934,
  //               4.0758,
  //               4.8742,
  //               4.0758,
  //               4.8793,
  //               4.2027,
  //               4.4934,
  //               4.2027
  //             ],
  //             "confidence": 0.983,
  //             "span": {
  //               "offset": 1591,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": ":",
  //             "polygon": [
  //               4.8996,
  //               4.0758,
  //               4.9402,
  //               4.0758,
  //               4.9453,
  //               4.2027,
  //               4.9047,
  //               4.2027
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 1600,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "INR/Indian",
  //             "polygon": [
  //               4.9656,
  //               4.0758,
  //               5.4632,
  //               4.0758,
  //               5.4733,
  //               4.1976,
  //               4.9707,
  //               4.2027
  //             ],
  //             "confidence": 0.818,
  //             "span": {
  //               "offset": 1602,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "Rupee",
  //             "polygon": [
  //               5.4835,
  //               4.0809,
  //               5.7932,
  //               4.0859,
  //               5.8084,
  //               4.1976,
  //               5.4987,
  //               4.1976
  //             ],
  //             "confidence": 0.562,
  //             "span": {
  //               "offset": 1613,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "Storage",
  //             "polygon": [
  //               4.4883,
  //               4.2027,
  //               4.8488,
  //               4.2078,
  //               4.8488,
  //               4.3347,
  //               4.4883,
  //               4.3347
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 1619,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "Loc",
  //             "polygon": [
  //               4.8742,
  //               4.2078,
  //               5.0062,
  //               4.2078,
  //               5.0062,
  //               4.3347,
  //               4.8742,
  //               4.3347
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 1627,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": ".:",
  //             "polygon": [
  //               5.0316,
  //               4.2078,
  //               5.0976,
  //               4.2078,
  //               5.0976,
  //               4.3347,
  //               5.0316,
  //               4.3347
  //             ],
  //             "confidence": 0.964,
  //             "span": {
  //               "offset": 1631,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "1001",
  //             "polygon": [
  //               5.1179,
  //               4.2078,
  //               5.3464,
  //               4.2128,
  //               5.3464,
  //               4.3296,
  //               5.1179,
  //               4.3347
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 1634,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "PS",
  //             "polygon": [
  //               5.4632,
  //               4.1925,
  //               5.6663,
  //               4.1469,
  //               5.6916,
  //               4.2941,
  //               5.4885,
  //               4.3347
  //             ],
  //             "confidence": 0.883,
  //             "span": {
  //               "offset": 1639,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "NO.",
  //             "polygon": [
  //               5.7018,
  //               4.1367,
  //               5.9455,
  //               4.0707,
  //               5.976,
  //               4.2382,
  //               5.7272,
  //               4.289
  //             ],
  //             "confidence": 0.842,
  //             "span": {
  //               "offset": 1642,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "20319654",
  //             "polygon": [
  //               6.7122,
  //               4.1113,
  //               7.6058,
  //               3.9032,
  //               7.6565,
  //               4.1012,
  //               6.7629,
  //               4.2941
  //             ],
  //             "confidence": 0.93,
  //             "span": {
  //               "offset": 1646,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "GSTIN/Unique",
  //             "polygon": [
  //               0.1015,
  //               4.3397,
  //               0.7514,
  //               4.3397,
  //               0.7565,
  //               4.4565,
  //               0.1015,
  //               4.4565
  //             ],
  //             "confidence": 0.734,
  //             "span": {
  //               "offset": 1655,
  //               "length": 12
  //             }
  //           },
  //           {
  //             "content": "ID",
  //             "polygon": [
  //               0.7768,
  //               4.3397,
  //               0.8682,
  //               4.3397,
  //               0.8682,
  //               4.4565,
  //               0.7768,
  //               4.4565
  //             ],
  //             "confidence": 0.955,
  //             "span": {
  //               "offset": 1668,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": ":",
  //             "polygon": [
  //               0.8987,
  //               4.3397,
  //               0.9393,
  //               4.3397,
  //               0.9444,
  //               4.4565,
  //               0.8987,
  //               4.4565
  //             ],
  //             "confidence": 0.541,
  //             "span": {
  //               "offset": 1671,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "27AAACL0140PAZA",
  //             "polygon": [
  //               0.9647,
  //               4.3397,
  //               1.8735,
  //               4.3347,
  //               1.8786,
  //               4.4514,
  //               0.9698,
  //               4.4565
  //             ],
  //             "confidence": 0.899,
  //             "span": {
  //               "offset": 1673,
  //               "length": 15
  //             }
  //           },
  //           {
  //             "content": "Site",
  //             "polygon": [
  //               2.234,
  //               4.3397,
  //               2.4066,
  //               4.3397,
  //               2.4066,
  //               4.4565,
  //               2.234,
  //               4.4565
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 1689,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "Contact",
  //             "polygon": [
  //               2.4269,
  //               4.3397,
  //               2.7976,
  //               4.3397,
  //               2.8027,
  //               4.4565,
  //               2.432,
  //               4.4565
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 1694,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "Person:",
  //             "polygon": [
  //               2.823,
  //               4.3397,
  //               3.1631,
  //               4.3397,
  //               3.1631,
  //               4.4565,
  //               2.823,
  //               4.4565
  //             ],
  //             "confidence": 0.99,
  //             "span": {
  //               "offset": 1702,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "State",
  //             "polygon": [
  //               0.0914,
  //               4.4819,
  //               0.3402,
  //               4.4768,
  //               0.3402,
  //               4.5884,
  //               0.0914,
  //               4.5935
  //             ],
  //             "confidence": 0.841,
  //             "span": {
  //               "offset": 1710,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "Code",
  //             "polygon": [
  //               0.3605,
  //               4.4768,
  //               0.6093,
  //               4.4768,
  //               0.6093,
  //               4.5884,
  //               0.3605,
  //               4.5884
  //             ],
  //             "confidence": 0.721,
  //             "span": {
  //               "offset": 1716,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "2/",
  //             "polygon": [
  //               0.6854,
  //               4.4768,
  //               0.8073,
  //               4.4819,
  //               0.8073,
  //               4.5884,
  //               0.6854,
  //               4.5884
  //             ],
  //             "confidence": 0.592,
  //             "span": {
  //               "offset": 1721,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "Site",
  //             "polygon": [
  //               2.234,
  //               4.4717,
  //               2.4066,
  //               4.4717,
  //               2.4117,
  //               4.5935,
  //               2.2391,
  //               4.5935
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 1724,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "Contact",
  //             "polygon": [
  //               2.432,
  //               4.4717,
  //               2.7925,
  //               4.4717,
  //               2.7925,
  //               4.5935,
  //               2.4371,
  //               4.5935
  //             ],
  //             "confidence": 0.989,
  //             "span": {
  //               "offset": 1729,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "Person",
  //             "polygon": [
  //               2.8179,
  //               4.4717,
  //               3.1378,
  //               4.4717,
  //               3.1378,
  //               4.5986,
  //               2.8179,
  //               4.5935
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 1737,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "Ph:",
  //             "polygon": [
  //               3.1631,
  //               4.4717,
  //               3.3205,
  //               4.4717,
  //               3.3205,
  //               4.5986,
  //               3.1631,
  //               4.5986
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 1744,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "2114669215",
  //             "polygon": [
  //               3.3409,
  //               4.4717,
  //               3.9095,
  //               4.4666,
  //               3.9095,
  //               4.5986,
  //               3.3459,
  //               4.5986
  //             ],
  //             "confidence": 0.973,
  //             "span": {
  //               "offset": 1748,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "LogSheet",
  //             "polygon": [
  //               4.4883,
  //               4.3448,
  //               4.925,
  //               4.3448,
  //               4.93,
  //               4.4717,
  //               4.4934,
  //               4.4717
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 1759,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "No:",
  //             "polygon": [
  //               4.9504,
  //               4.3448,
  //               5.1077,
  //               4.3499,
  //               5.1128,
  //               4.4717,
  //               4.9554,
  //               4.4717
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 1768,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "GC",
  //             "polygon": [
  //               4.4883,
  //               4.4819,
  //               4.6153,
  //               4.4819,
  //               4.6153,
  //               4.5986,
  //               4.4883,
  //               4.5935
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 1772,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "Note",
  //             "polygon": [
  //               4.6406,
  //               4.4819,
  //               4.8742,
  //               4.4819,
  //               4.8742,
  //               4.6037,
  //               4.6406,
  //               4.5986
  //             ],
  //             "confidence": 0.981,
  //             "span": {
  //               "offset": 1775,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "No:",
  //             "polygon": [
  //               4.8945,
  //               4.4819,
  //               5.0722,
  //               4.4819,
  //               5.0722,
  //               4.6037,
  //               4.8945,
  //               4.6037
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 1780,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "NAME",
  //             "polygon": [
  //               5.4987,
  //               4.3905,
  //               5.91,
  //               4.2941,
  //               5.9404,
  //               4.4311,
  //               5.5342,
  //               4.5225
  //             ],
  //             "confidence": 0.983,
  //             "span": {
  //               "offset": 1784,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "Destory",
  //             "polygon": [
  //               0.1066,
  //               4.6138,
  //               0.5027,
  //               4.6138,
  //               0.5027,
  //               4.7255,
  //               0.1117,
  //               4.7306
  //             ],
  //             "confidence": 0.518,
  //             "span": {
  //               "offset": 1789,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "Code",
  //             "polygon": [
  //               0.523,
  //               4.6138,
  //               0.7565,
  //               4.6138,
  //               0.7565,
  //               4.7255,
  //               0.523,
  //               4.7255
  //             ],
  //             "confidence": 0.907,
  //             "span": {
  //               "offset": 1797,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": ":",
  //             "polygon": [
  //               0.7768,
  //               4.6138,
  //               0.8124,
  //               4.6138,
  //               0.8174,
  //               4.7255,
  //               0.7768,
  //               4.7255
  //             ],
  //             "confidence": 0.722,
  //             "span": {
  //               "offset": 1802,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "00G5550011",
  //             "polygon": [
  //               0.8378,
  //               4.6138,
  //               1.4369,
  //               4.6138,
  //               1.4369,
  //               4.7306,
  //               0.8378,
  //               4.7255
  //             ],
  //             "confidence": 0.961,
  //             "span": {
  //               "offset": 1804,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "+Como93007",
  //             "polygon": [
  //               2.3305,
  //               4.6747,
  //               3.7064,
  //               4.6697,
  //               3.7115,
  //               4.9133,
  //               2.3305,
  //               4.9488
  //             ],
  //             "confidence": 0.503,
  //             "span": {
  //               "offset": 1815,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "Vehicle",
  //             "polygon": [
  //               4.4883,
  //               4.6138,
  //               4.8285,
  //               4.6138,
  //               4.8285,
  //               4.7356,
  //               4.4883,
  //               4.7306
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 1826,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "No:",
  //             "polygon": [
  //               4.8488,
  //               4.6138,
  //               5.0164,
  //               4.6189,
  //               5.0164,
  //               4.7407,
  //               4.8488,
  //               4.7356
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 1834,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "PROJECT",
  //             "polygon": [
  //               5.5444,
  //               4.5681,
  //               6.24,
  //               4.4159,
  //               6.2806,
  //               4.5631,
  //               5.585,
  //               4.7204
  //             ],
  //             "confidence": 0.989,
  //             "span": {
  //               "offset": 1838,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "NO",
  //             "polygon": [
  //               6.2704,
  //               4.4108,
  //               6.4938,
  //               4.355,
  //               6.5345,
  //               4.5072,
  //               6.3111,
  //               4.558
  //             ],
  //             "confidence": 0.97,
  //             "span": {
  //               "offset": 1846,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": ":",
  //             "polygon": [
  //               6.57,
  //               4.3397,
  //               6.6563,
  //               4.3194,
  //               6.6969,
  //               4.4717,
  //               6.6106,
  //               4.4869
  //             ],
  //             "confidence": 0.159,
  //             "span": {
  //               "offset": 1849,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "DEBIT",
  //             "polygon": [
  //               6.6919,
  //               4.3093,
  //               7.1184,
  //               4.2078,
  //               7.1539,
  //               4.36,
  //               6.7325,
  //               4.4616
  //             ],
  //             "confidence": 0.895,
  //             "span": {
  //               "offset": 1851,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "SOEn",
  //             "polygon": [
  //               6.3212,
  //               4.5732,
  //               6.768,
  //               4.4666,
  //               6.8086,
  //               4.6341,
  //               6.372,
  //               4.7509
  //             ],
  //             "confidence": 0.483,
  //             "span": {
  //               "offset": 1857,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "836",
  //             "polygon": [
  //               6.8289,
  //               4.4514,
  //               7.1945,
  //               4.3651,
  //               7.2301,
  //               4.5428,
  //               6.8746,
  //               4.6189
  //             ],
  //             "confidence": 0.821,
  //             "span": {
  //               "offset": 1862,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "hieral",
  //             "polygon": [
  //               0.0965,
  //               4.7559,
  //               0.3503,
  //               4.7509,
  //               0.3554,
  //               4.8575,
  //               0.1015,
  //               4.8625
  //             ],
  //             "confidence": 0.508,
  //             "span": {
  //               "offset": 1866,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "Name",
  //             "polygon": [
  //               0.3706,
  //               4.7509,
  //               0.655,
  //               4.7458,
  //               0.66,
  //               4.8575,
  //               0.3757,
  //               4.8575
  //             ],
  //             "confidence": 0.903,
  //             "span": {
  //               "offset": 1873,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "I",
  //             "polygon": [
  //               0.7159,
  //               4.7458,
  //               0.7514,
  //               4.7458,
  //               0.7565,
  //               4.8575,
  //               0.7159,
  //               4.8575
  //             ],
  //             "confidence": 0.533,
  //             "span": {
  //               "offset": 1878,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "ARSEN",
  //             "polygon": [
  //               0.7768,
  //               4.7458,
  //               1.0764,
  //               4.7407,
  //               1.0764,
  //               4.8575,
  //               0.7768,
  //               4.8575
  //             ],
  //             "confidence": 0.961,
  //             "span": {
  //               "offset": 1880,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "&",
  //             "polygon": [
  //               1.1119,
  //               4.7407,
  //               1.1881,
  //               4.7407,
  //               1.1881,
  //               4.8575,
  //               1.1119,
  //               4.8575
  //             ],
  //             "confidence": 0.971,
  //             "span": {
  //               "offset": 1886,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "TOUBRO",
  //             "polygon": [
  //               1.2084,
  //               4.7407,
  //               1.5892,
  //               4.7407,
  //               1.5892,
  //               4.8575,
  //               1.2084,
  //               4.8575
  //             ],
  //             "confidence": 0.681,
  //             "span": {
  //               "offset": 1888,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "LIMITED",
  //             "polygon": [
  //               1.6298,
  //               4.7407,
  //               2.0005,
  //               4.7407,
  //               2.0005,
  //               4.8575,
  //               1.6298,
  //               4.8575
  //             ],
  //             "confidence": 0.983,
  //             "span": {
  //               "offset": 1895,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "Mode",
  //             "polygon": [
  //               4.4832,
  //               4.7458,
  //               4.7574,
  //               4.7509,
  //               4.7574,
  //               4.8778,
  //               4.4832,
  //               4.8778
  //             ],
  //             "confidence": 0.983,
  //             "span": {
  //               "offset": 1903,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "of",
  //             "polygon": [
  //               4.7828,
  //               4.7509,
  //               4.864,
  //               4.7509,
  //               4.864,
  //               4.8778,
  //               4.7828,
  //               4.8778
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 1908,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "transport:",
  //             "polygon": [
  //               4.8894,
  //               4.7509,
  //               5.3515,
  //               4.7509,
  //               5.3515,
  //               4.8727,
  //               4.8894,
  //               4.8778
  //             ],
  //             "confidence": 0.982,
  //             "span": {
  //               "offset": 1911,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "CODE",
  //             "polygon": [
  //               5.5952,
  //               4.7661,
  //               6.0064,
  //               4.6697,
  //               6.0318,
  //               4.8219,
  //               5.6206,
  //               4.9133
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 1922,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "2/3/2024",
  //             "polygon": [
  //               6.2095,
  //               4.827,
  //               7.0422,
  //               4.6087,
  //               7.093,
  //               4.7864,
  //               6.2451,
  //               5.0097
  //             ],
  //             "confidence": 0.895,
  //             "span": {
  //               "offset": 1927,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "Material",
  //             "polygon": [
  //               0.0914,
  //               5.03,
  //               0.523,
  //               5.0351,
  //               0.523,
  //               5.1417,
  //               0.0914,
  //               5.1417
  //             ],
  //             "confidence": 0.748,
  //             "span": {
  //               "offset": 1936,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "Description",
  //             "polygon": [
  //               1.0307,
  //               5.096,
  //               1.5943,
  //               5.1011,
  //               1.5943,
  //               5.2178,
  //               1.0307,
  //               5.2128
  //             ],
  //             "confidence": 0.982,
  //             "span": {
  //               "offset": 1945,
  //               "length": 11
  //             }
  //           },
  //           {
  //             "content": "Qty",
  //             "polygon": [
  //               2.3102,
  //               5.1011,
  //               2.4828,
  //               5.1011,
  //               2.4777,
  //               5.2178,
  //               2.3051,
  //               5.2128
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 1957,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "Packs",
  //             "polygon": [
  //               2.7011,
  //               5.1011,
  //               2.9956,
  //               5.1062,
  //               2.9956,
  //               5.2077,
  //               2.7011,
  //               5.2026
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 1961,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "Volume",
  //             "polygon": [
  //               3.0921,
  //               5.03,
  //               3.4779,
  //               5.0351,
  //               3.4779,
  //               5.1417,
  //               3.0971,
  //               5.1366
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 1967,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "Rate",
  //             "polygon": [
  //               3.6709,
  //               5.025,
  //               3.9044,
  //               5.025,
  //               3.8994,
  //               5.1366,
  //               3.6709,
  //               5.1315
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 1974,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "DATE",
  //             "polygon": [
  //               5.6358,
  //               4.9387,
  //               5.9963,
  //               4.8625,
  //               6.0369,
  //               5.0402,
  //               5.6764,
  //               5.1214
  //             ],
  //             "confidence": 0.718,
  //             "span": {
  //               "offset": 1979,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "Value",
  //             "polygon": [
  //               4.2446,
  //               5.096,
  //               4.5239,
  //               5.0909,
  //               4.5239,
  //               5.2026,
  //               4.2446,
  //               5.1975
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 1984,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "In-Bill",
  //             "polygon": [
  //               4.8183,
  //               5.025,
  //               5.1128,
  //               5.025,
  //               5.1128,
  //               5.1315,
  //               4.8183,
  //               5.1315
  //             ],
  //             "confidence": 0.961,
  //             "span": {
  //               "offset": 1990,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "In-Bill",
  //             "polygon": [
  //               5.2651,
  //               5.025,
  //               5.585,
  //               5.0148,
  //               5.6002,
  //               5.1366,
  //               5.2651,
  //               5.1315
  //             ],
  //             "confidence": 0.947,
  //             "span": {
  //               "offset": 1998,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "Cash",
  //             "polygon": [
  //               5.7576,
  //               5.0148,
  //               5.9963,
  //               5.0199,
  //               5.9912,
  //               5.1315,
  //               5.7576,
  //               5.1265
  //             ],
  //             "confidence": 0.75,
  //             "span": {
  //               "offset": 2006,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "Taxable",
  //             "polygon": [
  //               6.2349,
  //               5.03,
  //               6.6259,
  //               5.025,
  //               6.6309,
  //               5.1366,
  //               6.24,
  //               5.1417
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 2011,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "Tax",
  //             "polygon": [
  //               6.8797,
  //               5.03,
  //               7.0574,
  //               5.03,
  //               7.0524,
  //               5.1265,
  //               6.8797,
  //               5.1265
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 2019,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "Total",
  //             "polygon": [
  //               7.4331,
  //               5.025,
  //               7.687,
  //               5.025,
  //               7.687,
  //               5.1315,
  //               7.4331,
  //               5.1265
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 2023,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "HSN",
  //             "polygon": [
  //               0.0863,
  //               5.162,
  //               0.2843,
  //               5.162,
  //               0.2894,
  //               5.2686,
  //               0.0863,
  //               5.2686
  //             ],
  //             "confidence": 0.89,
  //             "span": {
  //               "offset": 2029,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "(Lt/Kg)",
  //             "polygon": [
  //               3.087,
  //               5.162,
  //               3.4272,
  //               5.162,
  //               3.4272,
  //               5.2889,
  //               3.087,
  //               5.2838
  //             ],
  //             "confidence": 0.991,
  //             "span": {
  //               "offset": 2033,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "(INR/",
  //             "polygon": [
  //               3.6709,
  //               5.1569,
  //               3.94,
  //               5.162,
  //               3.94,
  //               5.2838,
  //               3.676,
  //               5.2838
  //             ],
  //             "confidence": 0.956,
  //             "span": {
  //               "offset": 2041,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "%)",
  //             "polygon": [
  //               3.9857,
  //               5.162,
  //               4.0821,
  //               5.162,
  //               4.0821,
  //               5.2838,
  //               3.9907,
  //               5.2838
  //             ],
  //             "confidence": 0.922,
  //             "span": {
  //               "offset": 2047,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "Disc.",
  //             "polygon": [
  //               4.8234,
  //               5.162,
  //               5.0621,
  //               5.162,
  //               5.057,
  //               5.2686,
  //               4.8234,
  //               5.2635
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 2050,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "Disc.",
  //             "polygon": [
  //               5.2702,
  //               5.162,
  //               5.5139,
  //               5.162,
  //               5.519,
  //               5.2686,
  //               5.2753,
  //               5.2686
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 2056,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "2",
  //             "polygon": [
  //               5.5342,
  //               5.162,
  //               5.5952,
  //               5.162,
  //               5.5952,
  //               5.2686,
  //               5.5393,
  //               5.2686
  //             ],
  //             "confidence": 0.997,
  //             "span": {
  //               "offset": 2062,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "Disc.",
  //             "polygon": [
  //               5.7526,
  //               5.162,
  //               5.9861,
  //               5.1671,
  //               5.9861,
  //               5.2635,
  //               5.7526,
  //               5.2584
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 2064,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "Amount",
  //             "polygon": [
  //               6.2349,
  //               5.162,
  //               6.6614,
  //               5.162,
  //               6.6614,
  //               5.2635,
  //               6.2349,
  //               5.2737
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 2070,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "Amount",
  //             "polygon": [
  //               6.8797,
  //               5.1671,
  //               7.2859,
  //               5.1671,
  //               7.291,
  //               5.2686,
  //               6.8797,
  //               5.2686
  //             ],
  //             "confidence": 0.983,
  //             "span": {
  //               "offset": 2077,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "Amount",
  //             "polygon": [
  //               7.4331,
  //               5.162,
  //               7.8343,
  //               5.1671,
  //               7.8393,
  //               5.2737,
  //               7.4382,
  //               5.2737
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 2084,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "3430229320",
  //             "polygon": [
  //               0.1371,
  //               5.3498,
  //               0.7261,
  //               5.36,
  //               0.721,
  //               5.4716,
  //               0.1371,
  //               5.4716
  //             ],
  //             "confidence": 0.552,
  //             "span": {
  //               "offset": 2091,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "APTHANHBPUFIN",
  //             "polygon": [
  //               1.0256,
  //               5.4209,
  //               1.8278,
  //               5.4209,
  //               1.8278,
  //               5.5325,
  //               1.0307,
  //               5.5325
  //             ],
  //             "confidence": 0.945,
  //             "span": {
  //               "offset": 2102,
  //               "length": 13
  //             }
  //           },
  //           {
  //             "content": "108",
  //             "polygon": [
  //               2.4625,
  //               5.3549,
  //               2.625,
  //               5.3549,
  //               2.625,
  //               5.4564,
  //               2.4625,
  //               5.4564
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 2116,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "108",
  //             "polygon": [
  //               2.8484,
  //               5.3549,
  //               3.0058,
  //               5.3549,
  //               3.0058,
  //               5.4564,
  //               2.8484,
  //               5.4564
  //             ],
  //             "confidence": 0.997,
  //             "span": {
  //               "offset": 2120,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "2160.000",
  //             "polygon": [
  //               3.1733,
  //               5.3549,
  //               3.5947,
  //               5.3498,
  //               3.5947,
  //               5.4665,
  //               3.1733,
  //               5.4615
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 2124,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "5600.00",
  //             "polygon": [
  //               3.7927,
  //               5.3498,
  //               4.1685,
  //               5.3447,
  //               4.1634,
  //               5.4665,
  //               3.7927,
  //               5.4665
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 2133,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "604800.00",
  //             "polygon": [
  //               4.2548,
  //               5.3447,
  //               4.7523,
  //               5.3447,
  //               4.7523,
  //               5.4615,
  //               4.2598,
  //               5.4665
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 2141,
  //               "length": 9
  //             }
  //           },
  //           {
  //             "content": "604800.00",
  //             "polygon": [
  //               6.3111,
  //               5.3498,
  //               6.7934,
  //               5.3447,
  //               6.7985,
  //               5.4615,
  //               6.3161,
  //               5.4615
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 2151,
  //               "length": 9
  //             }
  //           },
  //           {
  //             "content": "713664.00",
  //             "polygon": [
  //               7.5398,
  //               5.3498,
  //               8.017,
  //               5.3447,
  //               8.0221,
  //               5.4665,
  //               7.5398,
  //               5.4665
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 2161,
  //               "length": 9
  //             }
  //           },
  //           {
  //             "content": "OLIVEGRN",
  //             "polygon": [
  //               1.0256,
  //               5.5528,
  //               1.4876,
  //               5.5478,
  //               1.4927,
  //               5.6696,
  //               1.0307,
  //               5.6645
  //             ],
  //             "confidence": 0.834,
  //             "span": {
  //               "offset": 2171,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "20LT",
  //             "polygon": [
  //               1.5384,
  //               5.5478,
  //               1.7669,
  //               5.5478,
  //               1.772,
  //               5.6696,
  //               1.5384,
  //               5.6696
  //             ],
  //             "confidence": 0.922,
  //             "span": {
  //               "offset": 2180,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "DR",
  //             "polygon": [
  //               2.8788,
  //               5.4868,
  //               3.0007,
  //               5.4868,
  //               3.0007,
  //               5.5884,
  //               2.8788,
  //               5.5833
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 2185,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "=",
  //             "polygon": [
  //               3.2292,
  //               5.4818,
  //               3.3256,
  //               5.4818,
  //               3.3307,
  //               5.6188,
  //               3.2342,
  //               5.6188
  //             ],
  //             "confidence": 0.644,
  //             "span": {
  //               "offset": 2188,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "MSN.",
  //             "polygon": [
  //               0.0812,
  //               5.6239,
  //               0.3097,
  //               5.6239,
  //               0.3097,
  //               5.7305,
  //               0.0863,
  //               5.7356
  //             ],
  //             "confidence": 0.506,
  //             "span": {
  //               "offset": 2190,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "320890",
  //             "polygon": [
  //               0.3808,
  //               5.6239,
  //               0.7159,
  //               5.6188,
  //               0.7159,
  //               5.7356,
  //               0.3808,
  //               5.7305
  //             ],
  //             "confidence": 0.961,
  //             "span": {
  //               "offset": 2195,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "IN:",
  //             "polygon": [
  //               1.0307,
  //               5.6899,
  //               1.1525,
  //               5.6899,
  //               1.1576,
  //               5.8015,
  //               1.0307,
  //               5.7965
  //             ],
  //             "confidence": 0.927,
  //             "span": {
  //               "offset": 2202,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "Central",
  //             "polygon": [
  //               1.1779,
  //               5.6899,
  //               1.5181,
  //               5.6848,
  //               1.5181,
  //               5.8015,
  //               1.1779,
  //               5.8015
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 2206,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "GST",
  //             "polygon": [
  //               1.5384,
  //               5.6848,
  //               1.7263,
  //               5.6848,
  //               1.7263,
  //               5.8015,
  //               1.5435,
  //               5.8015
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 2214,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "OP",
  //             "polygon": [
  //               1.7466,
  //               5.6848,
  //               1.8786,
  //               5.6899,
  //               1.8837,
  //               5.7965,
  //               1.7517,
  //               5.8015
  //             ],
  //             "confidence": 0.972,
  //             "span": {
  //               "offset": 2218,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "9.00",
  //             "polygon": [
  //               3.9755,
  //               5.6137,
  //               4.1634,
  //               5.6137,
  //               4.1685,
  //               5.7153,
  //               3.9755,
  //               5.7203
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 2221,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "IN:",
  //             "polygon": [
  //               1.0205,
  //               5.8269,
  //               1.1475,
  //               5.8218,
  //               1.1525,
  //               5.9335,
  //               1.0205,
  //               5.9335
  //             ],
  //             "confidence": 0.876,
  //             "span": {
  //               "offset": 2226,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "State",
  //             "polygon": [
  //               1.1729,
  //               5.8218,
  //               1.4115,
  //               5.8218,
  //               1.4115,
  //               5.9335,
  //               1.1729,
  //               5.9335
  //             ],
  //             "confidence": 0.961,
  //             "span": {
  //               "offset": 2230,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "GST",
  //             "polygon": [
  //               1.4369,
  //               5.8218,
  //               1.6197,
  //               5.8218,
  //               1.6197,
  //               5.9335,
  //               1.4419,
  //               5.9335
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 2236,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "OP",
  //             "polygon": [
  //               1.64,
  //               5.8218,
  //               1.772,
  //               5.8218,
  //               1.772,
  //               5.9335,
  //               1.64,
  //               5.9335
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 2240,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "9.00",
  //             "polygon": [
  //               3.9704,
  //               5.7508,
  //               4.1634,
  //               5.7457,
  //               4.1685,
  //               5.8574,
  //               3.9755,
  //               5.8624
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 2243,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "54432.00",
  //             "polygon": [
  //               6.9254,
  //               5.7508,
  //               7.3519,
  //               5.7508,
  //               7.3519,
  //               5.8675,
  //               6.9305,
  //               5.8624
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 2248,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "54432.00",
  //             "polygon": [
  //               6.9254,
  //               5.8828,
  //               7.357,
  //               5.8828,
  //               7.357,
  //               5.9944,
  //               6.9305,
  //               5.9893
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 2257,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "604800.00",
  //             "polygon": [
  //               4.2598,
  //               6.0756,
  //               4.7473,
  //               6.0706,
  //               4.7473,
  //               6.1873,
  //               4.2598,
  //               6.1822
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 2266,
  //               "length": 9
  //             }
  //           },
  //           {
  //             "content": "0.00",
  //             "polygon": [
  //               4.991,
  //               6.0706,
  //               5.189,
  //               6.0706,
  //               5.189,
  //               6.1771,
  //               4.991,
  //               6.1771
  //             ],
  //             "confidence": 0.987,
  //             "span": {
  //               "offset": 2276,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "0.00",
  //             "polygon": [
  //               5.4733,
  //               6.0706,
  //               5.6815,
  //               6.0706,
  //               5.6815,
  //               6.1771,
  //               5.4733,
  //               6.1771
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 2281,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "0.00",
  //             "polygon": [
  //               5.9557,
  //               6.0706,
  //               6.1587,
  //               6.0706,
  //               6.1587,
  //               6.1822,
  //               5.9557,
  //               6.1822
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 2286,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "604800.00",
  //             "polygon": [
  //               6.3111,
  //               6.0706,
  //               6.7985,
  //               6.0655,
  //               6.7985,
  //               6.1822,
  //               6.3161,
  //               6.1822
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 2291,
  //               "length": 9
  //             }
  //           },
  //           {
  //             "content": "108864.00",
  //             "polygon": [
  //               6.8848,
  //               6.0706,
  //               7.3519,
  //               6.0706,
  //               7.3519,
  //               6.1924,
  //               6.8848,
  //               6.1873
  //             ],
  //             "confidence": 0.99,
  //             "span": {
  //               "offset": 2301,
  //               "length": 9
  //             }
  //           },
  //           {
  //             "content": "713664.00",
  //             "polygon": [
  //               7.5448,
  //               6.0655,
  //               8.0221,
  //               6.0655,
  //               8.017,
  //               6.1873,
  //               7.5448,
  //               6.1822
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 2311,
  //               "length": 9
  //             }
  //           },
  //           {
  //             "content": "Summary",
  //             "polygon": [
  //               3.021,
  //               6.2888,
  //               3.4983,
  //               6.2939,
  //               3.4983,
  //               6.4157,
  //               3.021,
  //               6.4005
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 2321,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "Taxable",
  //             "polygon": [
  //               4.2802,
  //               6.2736,
  //               4.666,
  //               6.2787,
  //               4.666,
  //               6.3954,
  //               4.2802,
  //               6.3954
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 2329,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "Amount",
  //             "polygon": [
  //               4.6965,
  //               6.2787,
  //               5.1027,
  //               6.2837,
  //               5.1027,
  //               6.3954,
  //               4.6965,
  //               6.3954
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 2337,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "Total",
  //             "polygon": [
  //               5.321,
  //               6.2787,
  //               5.5799,
  //               6.2837,
  //               5.5799,
  //               6.3903,
  //               5.321,
  //               6.3903
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 2344,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "Amount",
  //             "polygon": [
  //               5.6002,
  //               6.2837,
  //               6.0166,
  //               6.2787,
  //               6.0217,
  //               6.3903,
  //               5.6002,
  //               6.3903
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 2350,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "Taxable",
  //             "polygon": [
  //               2.3203,
  //               6.4868,
  //               2.6757,
  //               6.4868,
  //               2.6757,
  //               6.5984,
  //               2.3203,
  //               6.6035
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 2357,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "Amount",
  //             "polygon": [
  //               2.696,
  //               6.4868,
  //               3.087,
  //               6.4918,
  //               3.087,
  //               6.5984,
  //               2.696,
  //               6.5984
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 2365,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "604800.00",
  //             "polygon": [
  //               5.6713,
  //               6.4817,
  //               6.1537,
  //               6.4817,
  //               6.1537,
  //               6.5984,
  //               5.6764,
  //               6.5883
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 2372,
  //               "length": 9
  //             }
  //           },
  //           {
  //             "content": "IN",
  //             "polygon": [
  //               2.3102,
  //               6.6796,
  //               2.3914,
  //               6.6796,
  //               2.3914,
  //               6.8015,
  //               2.3152,
  //               6.8015
  //             ],
  //             "confidence": 0.988,
  //             "span": {
  //               "offset": 2382,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": ":",
  //             "polygon": [
  //               2.4219,
  //               6.6796,
  //               2.4523,
  //               6.6796,
  //               2.4574,
  //               6.8015,
  //               2.4219,
  //               6.8015
  //             ],
  //             "confidence": 0.961,
  //             "span": {
  //               "offset": 2385,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "Central",
  //             "polygon": [
  //               2.4777,
  //               6.6796,
  //               2.8179,
  //               6.6796,
  //               2.8179,
  //               6.8015,
  //               2.4777,
  //               6.8015
  //             ],
  //             "confidence": 0.985,
  //             "span": {
  //               "offset": 2387,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "GST-",
  //             "polygon": [
  //               2.8433,
  //               6.6796,
  //               3.0616,
  //               6.6796,
  //               3.0667,
  //               6.8015,
  //               2.8433,
  //               6.8015
  //             ],
  //             "confidence": 0.948,
  //             "span": {
  //               "offset": 2395,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "OP",
  //             "polygon": [
  //               3.087,
  //               6.6796,
  //               3.2241,
  //               6.6796,
  //               3.2241,
  //               6.8015,
  //               3.087,
  //               6.8015
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 2400,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "9",
  //             "polygon": [
  //               3.2444,
  //               6.6796,
  //               3.3104,
  //               6.6796,
  //               3.3104,
  //               6.8015,
  //               3.2444,
  //               6.8015
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 2403,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "%",
  //             "polygon": [
  //               3.3662,
  //               6.6796,
  //               3.4221,
  //               6.6796,
  //               3.4221,
  //               6.8015,
  //               3.3662,
  //               6.8015
  //             ],
  //             "confidence": 0.951,
  //             "span": {
  //               "offset": 2405,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "604800.00",
  //             "polygon": [
  //               4.6051,
  //               6.6847,
  //               5.0824,
  //               6.6847,
  //               5.0874,
  //               6.7964,
  //               4.6051,
  //               6.7913
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 2407,
  //               "length": 9
  //             }
  //           },
  //           {
  //             "content": "54432.00",
  //             "polygon": [
  //               5.7272,
  //               6.6746,
  //               6.1587,
  //               6.6746,
  //               6.1587,
  //               6.7964,
  //               5.7323,
  //               6.7913
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 2417,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "IN",
  //             "polygon": [
  //               2.3102,
  //               6.8877,
  //               2.3914,
  //               6.8877,
  //               2.3965,
  //               7.0045,
  //               2.3102,
  //               7.0045
  //             ],
  //             "confidence": 0.962,
  //             "span": {
  //               "offset": 2426,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": ":",
  //             "polygon": [
  //               2.4168,
  //               6.8877,
  //               2.4574,
  //               6.8877,
  //               2.4574,
  //               7.0045,
  //               2.4219,
  //               7.0045
  //             ],
  //             "confidence": 0.947,
  //             "span": {
  //               "offset": 2429,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "State",
  //             "polygon": [
  //               2.4828,
  //               6.8877,
  //               2.7163,
  //               6.8877,
  //               2.7163,
  //               7.0045,
  //               2.4828,
  //               7.0045
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 2431,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "GST-",
  //             "polygon": [
  //               2.7417,
  //               6.8877,
  //               2.9601,
  //               6.8827,
  //               2.9601,
  //               7.0045,
  //               2.7417,
  //               7.0045
  //             ],
  //             "confidence": 0.92,
  //             "span": {
  //               "offset": 2437,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "OP",
  //             "polygon": [
  //               2.9854,
  //               6.8827,
  //               3.1175,
  //               6.8827,
  //               3.1175,
  //               7.0045,
  //               2.9854,
  //               7.0045
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 2442,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "9",
  //             "polygon": [
  //               3.1428,
  //               6.8827,
  //               3.2038,
  //               6.8827,
  //               3.2038,
  //               7.0045,
  //               3.1428,
  //               7.0045
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 2445,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "%",
  //             "polygon": [
  //               3.2596,
  //               6.8827,
  //               3.3358,
  //               6.8827,
  //               3.3358,
  //               7.0045,
  //               3.2596,
  //               7.0045
  //             ],
  //             "confidence": 0.962,
  //             "span": {
  //               "offset": 2447,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "604800.00",
  //             "polygon": [
  //               4.6051,
  //               6.8827,
  //               5.0824,
  //               6.8827,
  //               5.0824,
  //               6.9943,
  //               4.6102,
  //               6.9842
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 2449,
  //               "length": 9
  //             }
  //           },
  //           {
  //             "content": "54432.00",
  //             "polygon": [
  //               5.7272,
  //               6.8776,
  //               6.1537,
  //               6.8725,
  //               6.1537,
  //               6.9994,
  //               5.7373,
  //               6.9893
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 2459,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "Total",
  //             "polygon": [
  //               2.3152,
  //               7.0908,
  //               2.5386,
  //               7.0857,
  //               2.5386,
  //               7.2075,
  //               2.3152,
  //               7.2024
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 2468,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "Amt.",
  //             "polygon": [
  //               2.564,
  //               7.0857,
  //               2.7874,
  //               7.0857,
  //               2.7874,
  //               7.2126,
  //               2.564,
  //               7.2075
  //             ],
  //             "confidence": 0.961,
  //             "span": {
  //               "offset": 2474,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "before",
  //             "polygon": [
  //               2.8128,
  //               7.0857,
  //               3.1175,
  //               7.0857,
  //               3.1175,
  //               7.2177,
  //               2.8128,
  //               7.2126
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 2479,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "rounding",
  //             "polygon": [
  //               3.1428,
  //               7.0857,
  //               3.5846,
  //               7.0857,
  //               3.5846,
  //               7.2177,
  //               3.1378,
  //               7.2177
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 2486,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "713664.00",
  //             "polygon": [
  //               5.6815,
  //               7.0755,
  //               6.1638,
  //               7.0755,
  //               6.1638,
  //               7.1923,
  //               5.6815,
  //               7.1923
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 2495,
  //               "length": 9
  //             }
  //           },
  //           {
  //             "content": "Total",
  //             "polygon": [
  //               0.0965,
  //               7.4207,
  //               0.3351,
  //               7.4156,
  //               0.3351,
  //               7.5374,
  //               0.0965,
  //               7.5374
  //             ],
  //             "confidence": 0.577,
  //             "span": {
  //               "offset": 2505,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "Invoice",
  //             "polygon": [
  //               0.3605,
  //               7.4156,
  //               0.7311,
  //               7.4156,
  //               0.7311,
  //               7.5425,
  //               0.3605,
  //               7.5374
  //             ],
  //             "confidence": 0.911,
  //             "span": {
  //               "offset": 2511,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "Value",
  //             "polygon": [
  //               0.7565,
  //               7.4156,
  //               1.0307,
  //               7.4105,
  //               1.0358,
  //               7.5425,
  //               0.7565,
  //               7.5425
  //             ],
  //             "confidence": 0.951,
  //             "span": {
  //               "offset": 2519,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "(",
  //             "polygon": [
  //               1.0561,
  //               7.4105,
  //               1.0916,
  //               7.4105,
  //               1.0916,
  //               7.5425,
  //               1.0612,
  //               7.5425
  //             ],
  //             "confidence": 0.986,
  //             "span": {
  //               "offset": 2525,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "In",
  //             "polygon": [
  //               1.117,
  //               7.4105,
  //               1.2185,
  //               7.4105,
  //               1.2185,
  //               7.5425,
  //               1.117,
  //               7.5425
  //             ],
  //             "confidence": 0.922,
  //             "span": {
  //               "offset": 2527,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "Words",
  //             "polygon": [
  //               1.2439,
  //               7.4105,
  //               1.5536,
  //               7.4105,
  //               1.5536,
  //               7.5425,
  //               1.2439,
  //               7.5425
  //             ],
  //             "confidence": 0.987,
  //             "span": {
  //               "offset": 2530,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": ")",
  //             "polygon": [
  //               1.579,
  //               7.4105,
  //               1.6044,
  //               7.4105,
  //               1.6044,
  //               7.5425,
  //               1.579,
  //               7.5425
  //             ],
  //             "confidence": 0.952,
  //             "span": {
  //               "offset": 2536,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": ":",
  //             "polygon": [
  //               1.6298,
  //               7.4105,
  //               1.6806,
  //               7.4105,
  //               1.6857,
  //               7.5476,
  //               1.6298,
  //               7.5425
  //             ],
  //             "confidence": 0.951,
  //             "span": {
  //               "offset": 2538,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "Seven",
  //             "polygon": [
  //               2.1071,
  //               7.4105,
  //               2.3812,
  //               7.4105,
  //               2.3863,
  //               7.5374,
  //               2.1122,
  //               7.5374
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 2540,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "Lakh",
  //             "polygon": [
  //               2.4066,
  //               7.4105,
  //               2.6351,
  //               7.4055,
  //               2.6402,
  //               7.5374,
  //               2.4168,
  //               7.5374
  //             ],
  //             "confidence": 0.989,
  //             "span": {
  //               "offset": 2546,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "Thirteen",
  //             "polygon": [
  //               2.6605,
  //               7.4055,
  //               3.0464,
  //               7.4055,
  //               3.0514,
  //               7.5374,
  //               2.6656,
  //               7.5374
  //             ],
  //             "confidence": 0.991,
  //             "span": {
  //               "offset": 2551,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "Thousand",
  //             "polygon": [
  //               3.0819,
  //               7.4055,
  //               3.5389,
  //               7.4004,
  //               3.5389,
  //               7.5374,
  //               3.087,
  //               7.5374
  //             ],
  //             "confidence": 0.973,
  //             "span": {
  //               "offset": 2560,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "Six",
  //             "polygon": [
  //               3.5643,
  //               7.4004,
  //               3.6861,
  //               7.4004,
  //               3.6861,
  //               7.5374,
  //               3.5643,
  //               7.5374
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 2569,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "Hundred",
  //             "polygon": [
  //               3.7115,
  //               7.4004,
  //               4.1329,
  //               7.4004,
  //               4.1329,
  //               7.5374,
  //               3.7115,
  //               7.5374
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 2573,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "Sixty",
  //             "polygon": [
  //               4.1583,
  //               7.4004,
  //               4.3665,
  //               7.4004,
  //               4.3665,
  //               7.5374,
  //               4.1583,
  //               7.5374
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 2581,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "Four",
  //             "polygon": [
  //               4.3919,
  //               7.4004,
  //               4.6051,
  //               7.4055,
  //               4.6051,
  //               7.5374,
  //               4.3919,
  //               7.5374
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 2587,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "Rupees",
  //             "polygon": [
  //               4.6305,
  //               7.4055,
  //               4.9757,
  //               7.4055,
  //               4.9757,
  //               7.5374,
  //               4.6305,
  //               7.5374
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 2592,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "Only",
  //             "polygon": [
  //               5.0011,
  //               7.4055,
  //               5.2296,
  //               7.4055,
  //               5.2296,
  //               7.5374,
  //               5.0011,
  //               7.5374
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 2599,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "Bochan",
  //             "polygon": [
  //               0.0711,
  //               7.908,
  //               0.3554,
  //               7.9029,
  //               0.3605,
  //               8.0095,
  //               0.0711,
  //               8.0095
  //             ],
  //             "confidence": 0.142,
  //             "span": {
  //               "offset": 2604,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "tre",
  //             "polygon": [
  //               0.3757,
  //               7.9029,
  //               0.4823,
  //               7.9029,
  //               0.4823,
  //               8.0146,
  //               0.3808,
  //               8.0095
  //             ],
  //             "confidence": 0.563,
  //             "span": {
  //               "offset": 2611,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "Identification",
  //             "polygon": [
  //               0.5027,
  //               7.9029,
  //               1.051,
  //               7.8978,
  //               1.0561,
  //               8.0095,
  //               0.5027,
  //               8.0146
  //             ],
  //             "confidence": 1,
  //             "span": {
  //               "offset": 2615,
  //               "length": 14
  //             }
  //           },
  //           {
  //             "content": "Number",
  //             "polygon": [
  //               1.0764,
  //               7.8978,
  //               1.4013,
  //               7.8978,
  //               1.4064,
  //               8.0095,
  //               1.0764,
  //               8.0095
  //             ],
  //             "confidence": 1,
  //             "span": {
  //               "offset": 2630,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "(CIN):",
  //             "polygon": [
  //               1.4267,
  //               7.8978,
  //               1.6501,
  //               7.8927,
  //               1.6552,
  //               8.0095,
  //               1.4267,
  //               8.0095
  //             ],
  //             "confidence": 0.877,
  //             "span": {
  //               "offset": 2637,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "U24110MH2011PTC220557",
  //             "polygon": [
  //               1.6755,
  //               7.8927,
  //               2.8027,
  //               7.8877,
  //               2.8027,
  //               7.9993,
  //               1.6755,
  //               8.0095
  //             ],
  //             "confidence": 0.004,
  //             "span": {
  //               "offset": 2644,
  //               "length": 21
  //             }
  //           },
  //           {
  //             "content": "Customer",
  //             "polygon": [
  //               3.4627,
  //               7.8978,
  //               4.0111,
  //               7.8978,
  //               4.0111,
  //               8.0146,
  //               3.4627,
  //               8.0146
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 2666,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "Package",
  //             "polygon": [
  //               5.2347,
  //               7.8826,
  //               5.7069,
  //               7.8826,
  //               5.7069,
  //               8.0247,
  //               5.2347,
  //               8.0196
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 2675,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "Summary",
  //             "polygon": [
  //               5.7373,
  //               7.8826,
  //               6.2908,
  //               7.8877,
  //               6.2857,
  //               8.0247,
  //               5.7373,
  //               8.0247
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 2683,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "Authorized",
  //             "polygon": [
  //               6.6411,
  //               7.8927,
  //               7.2148,
  //               7.8927,
  //               7.2097,
  //               8.0298,
  //               6.6411,
  //               8.0247
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 2691,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "Signatory",
  //             "polygon": [
  //               7.2504,
  //               7.8927,
  //               7.7632,
  //               7.8978,
  //               7.7632,
  //               8.0247,
  //               7.2453,
  //               8.0298
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 2702,
  //               "length": 9
  //             }
  //           },
  //           {
  //             "content": "til",
  //             "polygon": [
  //               0.0711,
  //               8.0247,
  //               0.2031,
  //               8.0196,
  //               0.2031,
  //               8.1313,
  //               0.0711,
  //               8.1313
  //             ],
  //             "confidence": 0.504,
  //             "span": {
  //               "offset": 2712,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "Feedback/complaints,",
  //             "polygon": [
  //               0.2234,
  //               8.0196,
  //               1.1322,
  //               8.0196,
  //               1.1322,
  //               8.1313,
  //               0.2285,
  //               8.1313
  //             ],
  //             "confidence": 0.539,
  //             "span": {
  //               "offset": 2716,
  //               "length": 20
  //             }
  //           },
  //           {
  //             "content": "email",
  //             "polygon": [
  //               1.1525,
  //               8.0196,
  //               1.3658,
  //               8.0196,
  //               1.3709,
  //               8.1313,
  //               1.1576,
  //               8.1313
  //             ],
  //             "confidence": 0.89,
  //             "span": {
  //               "offset": 2737,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "to:",
  //             "polygon": [
  //               1.3912,
  //               8.0196,
  //               1.4978,
  //               8.0146,
  //               1.5029,
  //               8.1313,
  //               1.3912,
  //               8.1313
  //             ],
  //             "confidence": 0.961,
  //             "span": {
  //               "offset": 2743,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "customercare.apppg@asianpaintsppg.com",
  //             "polygon": [
  //               1.5232,
  //               8.0146,
  //               3.2393,
  //               8.0146,
  //               3.2444,
  //               8.1313,
  //               1.5232,
  //               8.1313
  //             ],
  //             "confidence": 0.86,
  //             "span": {
  //               "offset": 2747,
  //               "length": 37
  //             }
  //           },
  //           {
  //             "content": "Hardner",
  //             "polygon": [
  //               5.2347,
  //               8.0247,
  //               5.6206,
  //               8.0298,
  //               5.6256,
  //               8.1516,
  //               5.2347,
  //               8.1465
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 2785,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "111",
  //             "polygon": [
  //               5.91,
  //               8.0298,
  //               6.0826,
  //               8.0298,
  //               6.0826,
  //               8.1364,
  //               5.91,
  //               8.1313
  //             ],
  //             "confidence": 0.983,
  //             "span": {
  //               "offset": 2793,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "Ke",
  //             "polygon": [
  //               0.0965,
  //               8.1465,
  //               0.1879,
  //               8.1465,
  //               0.1929,
  //               8.2531,
  //               0.1015,
  //               8.2582
  //             ],
  //             "confidence": 0.505,
  //             "span": {
  //               "offset": 2797,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "Bonne",
  //             "polygon": [
  //               0.2132,
  //               8.1465,
  //               0.4874,
  //               8.1414,
  //               0.4874,
  //               8.248,
  //               0.2132,
  //               8.2531
  //             ],
  //             "confidence": 0.509,
  //             "span": {
  //               "offset": 2800,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "Office",
  //             "polygon": [
  //               0.5077,
  //               8.1414,
  //               0.7464,
  //               8.1364,
  //               0.7464,
  //               8.248,
  //               0.5077,
  //               8.248
  //             ],
  //             "confidence": 0.727,
  //             "span": {
  //               "offset": 2806,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": ":",
  //             "polygon": [
  //               0.7667,
  //               8.1364,
  //               0.787,
  //               8.1364,
  //               0.7921,
  //               8.248,
  //               0.7667,
  //               8.248
  //             ],
  //             "confidence": 0.53,
  //             "span": {
  //               "offset": 2813,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "Plot",
  //             "polygon": [
  //               0.8073,
  //               8.1364,
  //               0.9748,
  //               8.1313,
  //               0.9799,
  //               8.243,
  //               0.8124,
  //               8.248
  //             ],
  //             "confidence": 0.852,
  //             "span": {
  //               "offset": 2815,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "no.",
  //             "polygon": [
  //               0.9951,
  //               8.1313,
  //               1.1221,
  //               8.1313,
  //               1.1221,
  //               8.243,
  //               1.0002,
  //               8.243
  //             ],
  //             "confidence": 0.951,
  //             "span": {
  //               "offset": 2820,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "5,",
  //             "polygon": [
  //               1.1424,
  //               8.1313,
  //               1.2185,
  //               8.1313,
  //               1.2236,
  //               8.243,
  //               1.1424,
  //               8.243
  //             ],
  //             "confidence": 0.796,
  //             "span": {
  //               "offset": 2824,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "Gaiwadi",
  //             "polygon": [
  //               1.2439,
  //               8.1313,
  //               1.5587,
  //               8.1313,
  //               1.5638,
  //               8.243,
  //               1.2439,
  //               8.243
  //             ],
  //             "confidence": 0.983,
  //             "span": {
  //               "offset": 2827,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "Industrial",
  //             "polygon": [
  //               1.579,
  //               8.1313,
  //               1.97,
  //               8.1313,
  //               1.9751,
  //               8.243,
  //               1.5841,
  //               8.243
  //             ],
  //             "confidence": 0.951,
  //             "span": {
  //               "offset": 2835,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "Estate,",
  //             "polygon": [
  //               1.9903,
  //               8.1313,
  //               2.2695,
  //               8.1364,
  //               2.2695,
  //               8.243,
  //               1.9954,
  //               8.243
  //             ],
  //             "confidence": 0.837,
  //             "span": {
  //               "offset": 2846,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "Acknowledgement",
  //             "polygon": [
  //               3.4627,
  //               8.0399,
  //               4.5289,
  //               8.045,
  //               4.5289,
  //               8.1821,
  //               3.4627,
  //               8.177
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 2854,
  //               "length": 15
  //             }
  //           },
  //           {
  //             "content": "Digitally",
  //             "polygon": [
  //               7.1996,
  //               8.1008,
  //               7.423,
  //               8.0958,
  //               7.423,
  //               8.1719,
  //               7.1996,
  //               8.1668
  //             ],
  //             "confidence": 0.961,
  //             "span": {
  //               "offset": 2870,
  //               "length": 9
  //             }
  //           },
  //           {
  //             "content": "signed",
  //             "polygon": [
  //               7.4382,
  //               8.0958,
  //               7.6159,
  //               8.0958,
  //               7.6159,
  //               8.1719,
  //               7.4382,
  //               8.1719
  //             ],
  //             "confidence": 0.929,
  //             "span": {
  //               "offset": 2880,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "by",
  //             "polygon": [
  //               7.6312,
  //               8.0958,
  //               7.7022,
  //               8.0958,
  //               7.7022,
  //               8.1719,
  //               7.6312,
  //               8.1719
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 2887,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "SAGAR",
  //             "polygon": [
  //               7.7175,
  //               8.0907,
  //               7.9053,
  //               8.0856,
  //               7.9053,
  //               8.1668,
  //               7.7175,
  //               8.1719
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 2890,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "3",
  //             "polygon": [
  //               0.0863,
  //               8.2531,
  //               0.1219,
  //               8.2531,
  //               0.1269,
  //               8.3699,
  //               0.0914,
  //               8.3699
  //             ],
  //             "confidence": 0.508,
  //             "span": {
  //               "offset": 2896,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "V",
  //             "polygon": [
  //               0.1472,
  //               8.2531,
  //               0.1879,
  //               8.2531,
  //               0.1929,
  //               8.3699,
  //               0.1523,
  //               8.3699
  //             ],
  //             "confidence": 0.581,
  //             "span": {
  //               "offset": 2898,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "Road,",
  //             "polygon": [
  //               0.2132,
  //               8.2531,
  //               0.4468,
  //               8.2531,
  //               0.4519,
  //               8.3699,
  //               0.2183,
  //               8.3699
  //             ],
  //             "confidence": 0.55,
  //             "span": {
  //               "offset": 2900,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "Goregaon",
  //             "polygon": [
  //               0.4722,
  //               8.2531,
  //               0.8733,
  //               8.2531,
  //               0.8784,
  //               8.3648,
  //               0.4773,
  //               8.3699
  //             ],
  //             "confidence": 0.833,
  //             "span": {
  //               "offset": 2906,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "(west),",
  //             "polygon": [
  //               0.8936,
  //               8.2531,
  //               1.1627,
  //               8.2531,
  //               1.1627,
  //               8.3648,
  //               0.8987,
  //               8.3648
  //             ],
  //             "confidence": 0.861,
  //             "span": {
  //               "offset": 2915,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "Mumbai",
  //             "polygon": [
  //               1.183,
  //               8.2531,
  //               1.5232,
  //               8.248,
  //               1.5283,
  //               8.3597,
  //               1.1881,
  //               8.3648
  //             ],
  //             "confidence": 0.986,
  //             "span": {
  //               "offset": 2923,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "400",
  //             "polygon": [
  //               1.5486,
  //               8.248,
  //               1.6958,
  //               8.248,
  //               1.6958,
  //               8.3597,
  //               1.5486,
  //               8.3597
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 2930,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "062",
  //             "polygon": [
  //               1.7161,
  //               8.248,
  //               1.8684,
  //               8.248,
  //               1.8684,
  //               8.3597,
  //               1.7212,
  //               8.3597
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 2934,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "Ph.No.",
  //             "polygon": [
  //               1.8888,
  //               8.248,
  //               2.1477,
  //               8.243,
  //               2.1477,
  //               8.3546,
  //               1.8888,
  //               8.3597
  //             ],
  //             "confidence": 0.904,
  //             "span": {
  //               "offset": 2938,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "022",
  //             "polygon": [
  //               2.168,
  //               8.243,
  //               2.3254,
  //               8.243,
  //               2.3254,
  //               8.3546,
  //               2.1731,
  //               8.3546
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 2945,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "62182700",
  //             "polygon": [
  //               2.3508,
  //               8.243,
  //               2.757,
  //               8.2379,
  //               2.757,
  //               8.3495,
  //               2.3508,
  //               8.3546
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 2949,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "Receipt",
  //             "polygon": [
  //               3.4627,
  //               8.2683,
  //               3.8689,
  //               8.2633,
  //               3.874,
  //               8.4003,
  //               3.4627,
  //               8.4003
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 2958,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "Date",
  //             "polygon": [
  //               3.8994,
  //               8.2633,
  //               4.1735,
  //               8.2633,
  //               4.1735,
  //               8.4054,
  //               3.8994,
  //               8.4003
  //             ],
  //             "confidence": 0.99,
  //             "span": {
  //               "offset": 2966,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "Base",
  //             "polygon": [
  //               5.2296,
  //               8.2074,
  //               5.4479,
  //               8.2074,
  //               5.4479,
  //               8.3242,
  //               5.2296,
  //               8.3191
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 2971,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "111",
  //             "polygon": [
  //               5.915,
  //               8.2024,
  //               6.0826,
  //               8.2074,
  //               6.0775,
  //               8.3191,
  //               5.91,
  //               8.314
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 2976,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "SAGAR",
  //             "polygon": [
  //               6.3821,
  //               8.1059,
  //               7.0625,
  //               8.1059,
  //               7.0727,
  //               8.3089,
  //               6.3771,
  //               8.3089
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 2980,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "SHRIKRISHNA",
  //             "polygon": [
  //               7.2047,
  //               8.1719,
  //               7.5652,
  //               8.1719,
  //               7.5702,
  //               8.243,
  //               7.2047,
  //               8.243
  //             ],
  //             "confidence": 0.961,
  //             "span": {
  //               "offset": 2986,
  //               "length": 11
  //             }
  //           },
  //           {
  //             "content": "KHADE",
  //             "polygon": [
  //               7.5804,
  //               8.1719,
  //               7.7733,
  //               8.1668,
  //               7.7784,
  //               8.243,
  //               7.5855,
  //               8.243
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 2998,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "DN:",
  //             "polygon": [
  //               7.1996,
  //               8.248,
  //               7.3011,
  //               8.248,
  //               7.3011,
  //               8.3191,
  //               7.1996,
  //               8.314
  //             ],
  //             "confidence": 0.927,
  //             "span": {
  //               "offset": 3004,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "cn=SAGAR",
  //             "polygon": [
  //               7.3164,
  //               8.248,
  //               7.6007,
  //               8.248,
  //               7.6007,
  //               8.3242,
  //               7.3164,
  //               8.3191
  //             ],
  //             "confidence": 0.597,
  //             "span": {
  //               "offset": 3008,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "SHRIKRISHNA",
  //             "polygon": [
  //               7.6159,
  //               8.248,
  //               7.9815,
  //               8.243,
  //               7.9815,
  //               8.3191,
  //               7.6159,
  //               8.3242
  //             ],
  //             "confidence": 0.976,
  //             "span": {
  //               "offset": 3017,
  //               "length": 11
  //             }
  //           },
  //           {
  //             "content": "Fre",
  //             "polygon": [
  //               0.0305,
  //               8.4815,
  //               0.1574,
  //               8.4815,
  //               0.1574,
  //               8.6033,
  //               0.0305,
  //               8.6033
  //             ],
  //             "confidence": 0.504,
  //             "span": {
  //               "offset": 3029,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "eripayment",
  //             "polygon": [
  //               0.2132,
  //               8.4815,
  //               0.7362,
  //               8.4815,
  //               0.7362,
  //               8.5983,
  //               0.2132,
  //               8.6033
  //             ],
  //             "confidence": 0.512,
  //             "span": {
  //               "offset": 3033,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "of",
  //             "polygon": [
  //               0.7565,
  //               8.4815,
  //               0.8327,
  //               8.4815,
  //               0.8327,
  //               8.5983,
  //               0.7565,
  //               8.5983
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 3044,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "this",
  //             "polygon": [
  //               0.8581,
  //               8.4815,
  //               1.0104,
  //               8.4815,
  //               1.0104,
  //               8.5983,
  //               0.8581,
  //               8.5983
  //             ],
  //             "confidence": 0.987,
  //             "span": {
  //               "offset": 3047,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "bill",
  //             "polygon": [
  //               1.0358,
  //               8.4764,
  //               1.1475,
  //               8.4764,
  //               1.1475,
  //               8.5932,
  //               1.0358,
  //               8.5983
  //             ],
  //             "confidence": 0.99,
  //             "span": {
  //               "offset": 3052,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "is",
  //             "polygon": [
  //               1.1729,
  //               8.4764,
  //               1.2338,
  //               8.4764,
  //               1.2338,
  //               8.5932,
  //               1.1729,
  //               8.5932
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 3057,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "not",
  //             "polygon": [
  //               1.2592,
  //               8.4764,
  //               1.3963,
  //               8.4764,
  //               1.3963,
  //               8.5932,
  //               1.2592,
  //               8.5932
  //             ],
  //             "confidence": 0.963,
  //             "span": {
  //               "offset": 3060,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "received",
  //             "polygon": [
  //               1.4166,
  //               8.4764,
  //               1.772,
  //               8.4764,
  //               1.772,
  //               8.5932,
  //               1.4166,
  //               8.5932
  //             ],
  //             "confidence": 0.977,
  //             "span": {
  //               "offset": 3064,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "within",
  //             "polygon": [
  //               1.7923,
  //               8.4764,
  //               2.0461,
  //               8.4764,
  //               2.0461,
  //               8.5881,
  //               1.7923,
  //               8.5932
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 3073,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "due",
  //             "polygon": [
  //               2.0715,
  //               8.4764,
  //               2.2239,
  //               8.4764,
  //               2.2239,
  //               8.5881,
  //               2.0715,
  //               8.5881
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 3080,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "date",
  //             "polygon": [
  //               2.2492,
  //               8.4764,
  //               2.4219,
  //               8.4714,
  //               2.4219,
  //               8.5881,
  //               2.2492,
  //               8.5881
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 3084,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "interest",
  //             "polygon": [
  //               2.4473,
  //               8.4714,
  //               2.762,
  //               8.4714,
  //               2.762,
  //               8.5881,
  //               2.4473,
  //               8.5881
  //             ],
  //             "confidence": 0.985,
  //             "span": {
  //               "offset": 3089,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "at",
  //             "polygon": [
  //               2.7824,
  //               8.4714,
  //               2.8788,
  //               8.4714,
  //               2.8788,
  //               8.5881,
  //               2.7824,
  //               8.5881
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 3098,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "18%",
  //             "polygon": [
  //               2.8991,
  //               8.4714,
  //               3.0616,
  //               8.4714,
  //               3.0616,
  //               8.5881,
  //               2.8991,
  //               8.5881
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 3101,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "will",
  //             "polygon": [
  //               3.0819,
  //               8.4714,
  //               3.2241,
  //               8.4714,
  //               3.2241,
  //               8.583,
  //               3.0819,
  //               8.5881
  //             ],
  //             "confidence": 0.984,
  //             "span": {
  //               "offset": 3105,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "be",
  //             "polygon": [
  //               3.2444,
  //               8.4714,
  //               3.3612,
  //               8.4714,
  //               3.3612,
  //               8.583,
  //               3.2444,
  //               8.583
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 3110,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "SHRIKRI",
  //             "polygon": [
  //               6.3771,
  //               8.3952,
  //               7.1691,
  //               8.3952,
  //               7.1742,
  //               8.6033,
  //               6.372,
  //               8.6084
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 3113,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "KHADE,",
  //             "polygon": [
  //               7.2047,
  //               8.3292,
  //               7.4078,
  //               8.3292,
  //               7.4128,
  //               8.4003,
  //               7.2097,
  //               8.3952
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 3121,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "c=IN,",
  //             "polygon": [
  //               7.423,
  //               8.3242,
  //               7.555,
  //               8.3242,
  //               7.5601,
  //               8.4003,
  //               7.423,
  //               8.4003
  //             ],
  //             "confidence": 0.801,
  //             "span": {
  //               "offset": 3128,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "st-Maharashtra,",
  //             "polygon": [
  //               7.5702,
  //               8.3242,
  //               8.012,
  //               8.3242,
  //               8.012,
  //               8.4003,
  //               7.5702,
  //               8.4003
  //             ],
  //             "confidence": 0.743,
  //             "span": {
  //               "offset": 3134,
  //               "length": 15
  //             }
  //           },
  //           {
  //             "content": "O",
  //             "polygon": [
  //               7.2047,
  //               8.4054,
  //               7.2402,
  //               8.4054,
  //               7.2453,
  //               8.4815,
  //               7.2047,
  //               8.4815
  //             ],
  //             "confidence": 0.52,
  //             "span": {
  //               "offset": 3150,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "ASIAN",
  //             "polygon": [
  //               7.2758,
  //               8.4054,
  //               7.4382,
  //               8.4054,
  //               7.4433,
  //               8.4764,
  //               7.2808,
  //               8.4815
  //             ],
  //             "confidence": 0.962,
  //             "span": {
  //               "offset": 3152,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "PAINTS",
  //             "polygon": [
  //               7.4585,
  //               8.4054,
  //               7.6464,
  //               8.4003,
  //               7.6464,
  //               8.4764,
  //               7.4636,
  //               8.4764
  //             ],
  //             "confidence": 0.978,
  //             "span": {
  //               "offset": 3158,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "PPG",
  //             "polygon": [
  //               7.6616,
  //               8.4003,
  //               7.7682,
  //               8.4003,
  //               7.7682,
  //               8.4764,
  //               7.6616,
  //               8.4764
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 3165,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "PRIVATE",
  //             "polygon": [
  //               7.7835,
  //               8.4003,
  //               8.0018,
  //               8.4003,
  //               8.0069,
  //               8.4714,
  //               7.7835,
  //               8.4764
  //             ],
  //             "confidence": 0.981,
  //             "span": {
  //               "offset": 3169,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "LIMITED,",
  //             "polygon": [
  //               7.1945,
  //               8.4714,
  //               7.4331,
  //               8.4815,
  //               7.4382,
  //               8.5577,
  //               7.1996,
  //               8.5627
  //             ],
  //             "confidence": 0.926,
  //             "span": {
  //               "offset": 3177,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "ou-MANAGEMENT,",
  //             "polygon": [
  //               7.4484,
  //               8.4815,
  //               7.9916,
  //               8.4714,
  //               7.9916,
  //               8.5577,
  //               7.4535,
  //               8.5526
  //             ],
  //             "confidence": 0.576,
  //             "span": {
  //               "offset": 3186,
  //               "length": 14
  //             }
  //           },
  //           {
  //             "content": "serialNumbers",
  //             "polygon": [
  //               7.2097,
  //               8.5678,
  //               7.6007,
  //               8.5627,
  //               7.6007,
  //               8.6287,
  //               7.2097,
  //               8.6236
  //             ],
  //             "confidence": 0.553,
  //             "span": {
  //               "offset": 3201,
  //               "length": 13
  //             }
  //           },
  //           {
  //             "content": "F087D64B9EDD6CC05130A98",
  //             "polygon": [
  //               7.2047,
  //               8.6287,
  //               8.0069,
  //               8.6287,
  //               8.0069,
  //               8.7099,
  //               7.2047,
  //               8.6998
  //             ],
  //             "confidence": 0.926,
  //             "span": {
  //               "offset": 3215,
  //               "length": 23
  //             }
  //           },
  //           {
  //             "content": "Any",
  //             "polygon": [
  //               0.0812,
  //               8.7201,
  //               0.2285,
  //               8.7201,
  //               0.2285,
  //               8.8368,
  //               0.0812,
  //               8.8368
  //             ],
  //             "confidence": 0.602,
  //             "span": {
  //               "offset": 3239,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "et",
  //             "polygon": [
  //               0.2539,
  //               8.7201,
  //               0.3148,
  //               8.7201,
  //               0.3148,
  //               8.8368,
  //               0.2539,
  //               8.8368
  //             ],
  //             "confidence": 0.528,
  //             "span": {
  //               "offset": 3243,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "ference",
  //             "polygon": [
  //               0.3351,
  //               8.7201,
  //               0.6651,
  //               8.7201,
  //               0.6651,
  //               8.8317,
  //               0.3351,
  //               8.8368
  //             ],
  //             "confidence": 0.567,
  //             "span": {
  //               "offset": 3246,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "or",
  //             "polygon": [
  //               0.6905,
  //               8.7201,
  //               0.7717,
  //               8.715,
  //               0.7717,
  //               8.8317,
  //               0.6905,
  //               8.8317
  //             ],
  //             "confidence": 0.939,
  //             "span": {
  //               "offset": 3254,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "dispute",
  //             "polygon": [
  //               0.7971,
  //               8.715,
  //               1.1018,
  //               8.715,
  //               1.1018,
  //               8.8317,
  //               0.7971,
  //               8.8317
  //             ],
  //             "confidence": 0.961,
  //             "span": {
  //               "offset": 3257,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "arising",
  //             "polygon": [
  //               1.1272,
  //               8.715,
  //               1.3963,
  //               8.715,
  //               1.3963,
  //               8.8267,
  //               1.1272,
  //               8.8317
  //             ],
  //             "confidence": 0.981,
  //             "span": {
  //               "offset": 3265,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "under",
  //             "polygon": [
  //               1.4216,
  //               8.715,
  //               1.6552,
  //               8.715,
  //               1.6552,
  //               8.8267,
  //               1.4216,
  //               8.8267
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 3273,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "this",
  //             "polygon": [
  //               1.6755,
  //               8.715,
  //               1.8278,
  //               8.715,
  //               1.8278,
  //               8.8267,
  //               1.6755,
  //               8.8267
  //             ],
  //             "confidence": 0.989,
  //             "span": {
  //               "offset": 3279,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "document/contract",
  //             "polygon": [
  //               1.8481,
  //               8.715,
  //               2.6503,
  //               8.7099,
  //               2.6503,
  //               8.8216,
  //               1.8481,
  //               8.8267
  //             ],
  //             "confidence": 0.962,
  //             "span": {
  //               "offset": 3284,
  //               "length": 17
  //             }
  //           },
  //           {
  //             "content": "shall",
  //             "polygon": [
  //               2.6707,
  //               8.7099,
  //               2.8534,
  //               8.7099,
  //               2.8534,
  //               8.8216,
  //               2.6707,
  //               8.8216
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 3302,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "be",
  //             "polygon": [
  //               2.8737,
  //               8.7099,
  //               2.9804,
  //               8.7099,
  //               2.9804,
  //               8.8216,
  //               2.8737,
  //               8.8216
  //             ],
  //             "confidence": 0.947,
  //             "span": {
  //               "offset": 3308,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "subject",
  //             "polygon": [
  //               3.0007,
  //               8.7099,
  //               3.2952,
  //               8.7099,
  //               3.2952,
  //               8.8216,
  //               3.0007,
  //               8.8216
  //             ],
  //             "confidence": 0.991,
  //             "span": {
  //               "offset": 3311,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "to",
  //             "polygon": [
  //               3.3205,
  //               8.7099,
  //               3.4069,
  //               8.7099,
  //               3.4069,
  //               8.8216,
  //               3.3205,
  //               8.8216
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 3319,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "Receipt",
  //             "polygon": [
  //               3.4576,
  //               8.6389,
  //               3.8841,
  //               8.6389,
  //               3.879,
  //               8.781,
  //               3.4576,
  //               8.781
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 3322,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "Time",
  //             "polygon": [
  //               3.9095,
  //               8.6389,
  //               4.1888,
  //               8.6389,
  //               4.1888,
  //               8.781,
  //               3.9095,
  //               8.781
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 3330,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "SHNA",
  //             "polygon": [
  //               6.3771,
  //               8.7048,
  //               6.9457,
  //               8.7099,
  //               6.9457,
  //               8.9028,
  //               6.3771,
  //               8.9028
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 3335,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "3170F11DE01B5DA6349201E",
  //             "polygon": [
  //               7.2047,
  //               8.7099,
  //               7.9916,
  //               8.7099,
  //               7.9916,
  //               8.7861,
  //               7.2097,
  //               8.781
  //             ],
  //             "confidence": 0.904,
  //             "span": {
  //               "offset": 3340,
  //               "length": 23
  //             }
  //           },
  //           {
  //             "content": "exasive",
  //             "polygon": [
  //               0.0711,
  //               8.8419,
  //               0.4468,
  //               8.8368,
  //               0.4468,
  //               8.9536,
  //               0.0711,
  //               8.9536
  //             ],
  //             "confidence": 0.525,
  //             "span": {
  //               "offset": 3364,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "jusrisdiction",
  //             "polygon": [
  //               0.4671,
  //               8.8368,
  //               0.9647,
  //               8.8368,
  //               0.9698,
  //               8.9485,
  //               0.4722,
  //               8.9536
  //             ],
  //             "confidence": 0.693,
  //             "span": {
  //               "offset": 3372,
  //               "length": 13
  //             }
  //           },
  //           {
  //             "content": "of",
  //             "polygon": [
  //               0.9901,
  //               8.8368,
  //               1.0662,
  //               8.8368,
  //               1.0662,
  //               8.9485,
  //               0.9901,
  //               8.9485
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 3386,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "the",
  //             "polygon": [
  //               1.0865,
  //               8.8368,
  //               1.2287,
  //               8.8368,
  //               1.2338,
  //               8.9434,
  //               1.0916,
  //               8.9485
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 3389,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "courts",
  //             "polygon": [
  //               1.2541,
  //               8.8368,
  //               1.5029,
  //               8.8368,
  //               1.5029,
  //               8.9434,
  //               1.2541,
  //               8.9434
  //             ],
  //             "confidence": 0.972,
  //             "span": {
  //               "offset": 3393,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "in",
  //             "polygon": [
  //               1.5232,
  //               8.8368,
  //               1.5943,
  //               8.8368,
  //               1.5943,
  //               8.9434,
  //               1.5232,
  //               8.9434
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 3400,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "Mumbai",
  //             "polygon": [
  //               1.6146,
  //               8.8368,
  //               1.9751,
  //               8.8368,
  //               1.9751,
  //               8.9383,
  //               1.6146,
  //               8.9434
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 3403,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "EBC2CD62B8833D96D5",
  //             "polygon": [
  //               7.2097,
  //               8.7911,
  //               7.8495,
  //               8.7861,
  //               7.8495,
  //               8.8622,
  //               7.2097,
  //               8.8571
  //             ],
  //             "confidence": 0.59,
  //             "span": {
  //               "offset": 3410,
  //               "length": 18
  //             }
  //           },
  //           {
  //             "content": "Reason:",
  //             "polygon": [
  //               7.1996,
  //               8.8673,
  //               7.4027,
  //               8.8673,
  //               7.4078,
  //               8.9383,
  //               7.2047,
  //               8.9383
  //             ],
  //             "confidence": 0.842,
  //             "span": {
  //               "offset": 3429,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "I",
  //             "polygon": [
  //               7.4179,
  //               8.8673,
  //               7.4382,
  //               8.8673,
  //               7.4433,
  //               8.9383,
  //               7.4179,
  //               8.9383
  //             ],
  //             "confidence": 0.715,
  //             "span": {
  //               "offset": 3437,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "attest",
  //             "polygon": [
  //               7.4535,
  //               8.8673,
  //               7.6007,
  //               8.8673,
  //               7.6058,
  //               8.9383,
  //               7.4585,
  //               8.9383
  //             ],
  //             "confidence": 0.991,
  //             "span": {
  //               "offset": 3439,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "to",
  //             "polygon": [
  //               7.6159,
  //               8.8673,
  //               7.6718,
  //               8.8673,
  //               7.6769,
  //               8.9383,
  //               7.621,
  //               8.9383
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 3446,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "the",
  //             "polygon": [
  //               7.687,
  //               8.8673,
  //               7.7835,
  //               8.8723,
  //               7.7886,
  //               8.9383,
  //               7.687,
  //               8.9383
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 3449,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "Customer",
  //             "polygon": [
  //               3.4576,
  //               8.9992,
  //               3.9907,
  //               8.9992,
  //               3.9907,
  //               9.1718,
  //               3.4526,
  //               9.1718
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 3453,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "Sign",
  //             "polygon": [
  //               4.0212,
  //               8.9992,
  //               4.2598,
  //               8.9942,
  //               4.2649,
  //               9.1718,
  //               4.0212,
  //               9.1718
  //             ],
  //             "confidence": 0.99,
  //             "span": {
  //               "offset": 3462,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "&",
  //             "polygon": [
  //               4.2954,
  //               8.9942,
  //               4.3766,
  //               8.9891,
  //               4.3817,
  //               9.1667,
  //               4.3005,
  //               9.1718
  //             ],
  //             "confidence": 0.942,
  //             "span": {
  //               "offset": 3467,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "KHADE",
  //             "polygon": [
  //               6.372,
  //               8.9992,
  //               7.098,
  //               8.9992,
  //               7.098,
  //               9.2023,
  //               6.372,
  //               9.1972
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 3469,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "accuracy",
  //             "polygon": [
  //               7.1996,
  //               8.9485,
  //               7.4382,
  //               8.9485,
  //               7.4433,
  //               9.0195,
  //               7.2047,
  //               9.0195
  //             ],
  //             "confidence": 0.981,
  //             "span": {
  //               "offset": 3475,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "and",
  //             "polygon": [
  //               7.4535,
  //               8.9485,
  //               7.555,
  //               8.9434,
  //               7.555,
  //               9.0195,
  //               7.4535,
  //               9.0195
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 3484,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "integrity",
  //             "polygon": [
  //               7.5652,
  //               8.9434,
  //               7.7987,
  //               8.9434,
  //               7.7987,
  //               9.0195,
  //               7.5702,
  //               9.0195
  //             ],
  //             "confidence": 0.949,
  //             "span": {
  //               "offset": 3488,
  //               "length": 9
  //             }
  //           },
  //           {
  //             "content": "of",
  //             "polygon": [
  //               7.8139,
  //               8.9434,
  //               7.8647,
  //               8.9434,
  //               7.8596,
  //               9.0195,
  //               7.8139,
  //               9.0195
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 3498,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "this",
  //             "polygon": [
  //               7.8799,
  //               8.9434,
  //               7.9866,
  //               8.9383,
  //               7.9866,
  //               9.0195,
  //               7.8749,
  //               9.0195
  //             ],
  //             "confidence": 0.988,
  //             "span": {
  //               "offset": 3501,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "document",
  //             "polygon": [
  //               7.2047,
  //               9.0297,
  //               7.4941,
  //               9.0246,
  //               7.4941,
  //               9.0906,
  //               7.2047,
  //               9.0906
  //             ],
  //             "confidence": 0.981,
  //             "span": {
  //               "offset": 3506,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "Stamp",
  //             "polygon": [
  //               3.4627,
  //               9.1667,
  //               3.8232,
  //               9.1718,
  //               3.8232,
  //               9.3038,
  //               3.4627,
  //               9.2987
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 3515,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "Date:",
  //             "polygon": [
  //               7.2047,
  //               9.0957,
  //               7.3468,
  //               9.0957,
  //               7.3468,
  //               9.1667,
  //               7.2047,
  //               9.1667
  //             ],
  //             "confidence": 0.89,
  //             "span": {
  //               "offset": 3521,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "2024.02.29",
  //             "polygon": [
  //               7.357,
  //               9.0957,
  //               7.6515,
  //               9.0957,
  //               7.6515,
  //               9.1667,
  //               7.357,
  //               9.1667
  //             ],
  //             "confidence": 0.951,
  //             "span": {
  //               "offset": 3527,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "23:15:05",
  //             "polygon": [
  //               7.6667,
  //               9.0957,
  //               7.8901,
  //               9.0957,
  //               7.8901,
  //               9.1667,
  //               7.6667,
  //               9.1667
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 3538,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "Total",
  //             "polygon": [
  //               5.2398,
  //               9.2226,
  //               5.4581,
  //               9.2175,
  //               5.4632,
  //               9.3444,
  //               5.2398,
  //               9.3444
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 3547,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "Packs:",
  //             "polygon": [
  //               5.4835,
  //               9.2175,
  //               5.8033,
  //               9.2175,
  //               5.8033,
  //               9.3444,
  //               5.4885,
  //               9.3444
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 3553,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "222",
  //             "polygon": [
  //               5.8287,
  //               9.2175,
  //               6.0064,
  //               9.2124,
  //               6.0064,
  //               9.3444,
  //               5.8287,
  //               9.3444
  //             ],
  //             "confidence": 0.996,
  //             "span": {
  //               "offset": 3560,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "+05'30",
  //             "polygon": [
  //               7.2097,
  //               9.1769,
  //               7.3925,
  //               9.1718,
  //               7.3925,
  //               9.248,
  //               7.2097,
  //               9.2429
  //             ],
  //             "confidence": 0.86,
  //             "span": {
  //               "offset": 3564,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "DECLARATION",
  //             "polygon": [
  //               3.7115,
  //               9.4053,
  //               4.4071,
  //               9.4053,
  //               4.4071,
  //               9.517,
  //               3.7115,
  //               9.517
  //             ],
  //             "confidence": 0.991,
  //             "span": {
  //               "offset": 3571,
  //               "length": 11
  //             }
  //           },
  //           {
  //             "content": "Brent",
  //             "polygon": [
  //               0.1879,
  //               9.8215,
  //               0.4113,
  //               9.8164,
  //               0.4113,
  //               9.9078,
  //               0.1929,
  //               9.9078
  //             ],
  //             "confidence": 0.506,
  //             "span": {
  //               "offset": 3583,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "ie",
  //             "polygon": [
  //               0.4265,
  //               9.8164,
  //               0.5077,
  //               9.8164,
  //               0.5128,
  //               9.9078,
  //               0.4316,
  //               9.9078
  //             ],
  //             "confidence": 0.566,
  //             "span": {
  //               "offset": 3589,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "sub",
  //             "polygon": [
  //               0.528,
  //               9.8164,
  //               0.6499,
  //               9.8164,
  //               0.6499,
  //               9.9078,
  //               0.5331,
  //               9.9078
  //             ],
  //             "confidence": 0.556,
  //             "span": {
  //               "offset": 3592,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "ect",
  //             "polygon": [
  //               0.6651,
  //               9.8164,
  //               0.7717,
  //               9.8164,
  //               0.7768,
  //               9.9078,
  //               0.6702,
  //               9.9078
  //             ],
  //             "confidence": 0.623,
  //             "span": {
  //               "offset": 3596,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "to",
  //             "polygon": [
  //               0.7921,
  //               9.8114,
  //               0.8682,
  //               9.8114,
  //               0.8682,
  //               9.9078,
  //               0.7971,
  //               9.9078
  //             ],
  //             "confidence": 0.864,
  //             "span": {
  //               "offset": 3600,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "our",
  //             "polygon": [
  //               0.8834,
  //               9.8114,
  //               1.0053,
  //               9.8114,
  //               1.0104,
  //               9.9078,
  //               0.8885,
  //               9.9078
  //             ],
  //             "confidence": 0.921,
  //             "span": {
  //               "offset": 3603,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "standard",
  //             "polygon": [
  //               1.0256,
  //               9.8114,
  //               1.3302,
  //               9.8114,
  //               1.3353,
  //               9.9078,
  //               1.0256,
  //               9.9078
  //             ],
  //             "confidence": 0.972,
  //             "span": {
  //               "offset": 3607,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "terms",
  //             "polygon": [
  //               1.3506,
  //               9.8063,
  //               1.5486,
  //               9.8063,
  //               1.5536,
  //               9.9078,
  //               1.3506,
  //               9.9078
  //             ],
  //             "confidence": 0.963,
  //             "span": {
  //               "offset": 3616,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "and",
  //             "polygon": [
  //               1.5689,
  //               9.8063,
  //               1.7009,
  //               9.8063,
  //               1.706,
  //               9.9078,
  //               1.5689,
  //               9.9078
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 3622,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "conditions",
  //             "polygon": [
  //               1.7212,
  //               9.8063,
  //               2.0868,
  //               9.8012,
  //               2.0868,
  //               9.9078,
  //               1.7263,
  //               9.9078
  //             ],
  //             "confidence": 0.95,
  //             "span": {
  //               "offset": 3626,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "as",
  //             "polygon": [
  //               2.1071,
  //               9.8012,
  //               2.1782,
  //               9.8012,
  //               2.1832,
  //               9.9078,
  //               2.1071,
  //               9.9078
  //             ],
  //             "confidence": 0.933,
  //             "span": {
  //               "offset": 3637,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "per",
  //             "polygon": [
  //               2.1985,
  //               9.8012,
  //               2.3152,
  //               9.8012,
  //               2.3203,
  //               9.9078,
  //               2.1985,
  //               9.9078
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 3640,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "our",
  //             "polygon": [
  //               2.3356,
  //               9.8012,
  //               2.4473,
  //               9.8012,
  //               2.4523,
  //               9.9078,
  //               2.3406,
  //               9.9078
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 3644,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "dealer",
  //             "polygon": [
  //               2.4676,
  //               9.8012,
  //               2.6859,
  //               9.7961,
  //               2.691,
  //               9.9078,
  //               2.4726,
  //               9.9078
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 3648,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "price",
  //             "polygon": [
  //               2.7062,
  //               9.7961,
  //               2.8737,
  //               9.7961,
  //               2.8788,
  //               9.9027,
  //               2.7113,
  //               9.9078
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 3655,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "list.",
  //             "polygon": [
  //               2.8941,
  //               9.7961,
  //               3.0261,
  //               9.7961,
  //               3.0311,
  //               9.9027,
  //               2.8991,
  //               9.9027
  //             ],
  //             "confidence": 0.887,
  //             "span": {
  //               "offset": 3661,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "på",
  //             "polygon": [
  //               0.4366,
  //               9.9179,
  //               0.5128,
  //               9.9179,
  //               0.5128,
  //               10.0144,
  //               0.4366,
  //               10.0144
  //             ],
  //             "confidence": 0.506,
  //             "span": {
  //               "offset": 3667,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "vand",
  //             "polygon": [
  //               0.5331,
  //               9.9179,
  //               0.6956,
  //               9.9179,
  //               0.6956,
  //               10.0144,
  //               0.5382,
  //               10.0144
  //             ],
  //             "confidence": 0.523,
  //             "span": {
  //               "offset": 3670,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "except",
  //             "polygon": [
  //               0.7159,
  //               9.9179,
  //               0.9545,
  //               9.9129,
  //               0.9596,
  //               10.0144,
  //               0.721,
  //               10.0144
  //             ],
  //             "confidence": 0.731,
  //             "span": {
  //               "offset": 3675,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "on",
  //             "polygon": [
  //               0.9748,
  //               9.9129,
  //               1.0662,
  //               9.9129,
  //               1.0713,
  //               10.0144,
  //               0.9799,
  //               10.0144
  //             ],
  //             "confidence": 0.641,
  //             "span": {
  //               "offset": 3682,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "our",
  //             "polygon": [
  //               1.0865,
  //               9.9129,
  //               1.1982,
  //               9.9129,
  //               1.2033,
  //               10.0144,
  //               1.0916,
  //               10.0144
  //             ],
  //             "confidence": 0.956,
  //             "span": {
  //               "offset": 3685,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "official",
  //             "polygon": [
  //               1.2236,
  //               9.9129,
  //               1.447,
  //               9.9078,
  //               1.447,
  //               10.0144,
  //               1.2236,
  //               10.0144
  //             ],
  //             "confidence": 0.951,
  //             "span": {
  //               "offset": 3689,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "form.We",
  //             "polygon": [
  //               1.4673,
  //               9.9078,
  //               1.7618,
  //               9.9027,
  //               1.7618,
  //               10.0093,
  //               1.4673,
  //               10.0144
  //             ],
  //             "confidence": 0.855,
  //             "span": {
  //               "offset": 3698,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "have",
  //             "polygon": [
  //               1.7821,
  //               9.9027,
  //               1.9497,
  //               9.9027,
  //               1.9548,
  //               10.0093,
  //               1.7872,
  //               10.0093
  //             ],
  //             "confidence": 0.978,
  //             "span": {
  //               "offset": 3706,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "enabled",
  //             "polygon": [
  //               1.9751,
  //               9.9027,
  //               2.2543,
  //               9.9027,
  //               2.2543,
  //               10.0093,
  //               1.9751,
  //               10.0093
  //             ],
  //             "confidence": 0.961,
  //             "span": {
  //               "offset": 3711,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "additional",
  //             "polygon": [
  //               2.2746,
  //               9.9027,
  //               2.625,
  //               9.8976,
  //               2.625,
  //               10.0093,
  //               2.2746,
  //               10.0093
  //             ],
  //             "confidence": 0.936,
  //             "span": {
  //               "offset": 3719,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "electronic",
  //             "polygon": [
  //               2.6453,
  //               9.8976,
  //               2.9854,
  //               9.8976,
  //               2.9854,
  //               10.0093,
  //               2.6503,
  //               10.0093
  //             ],
  //             "confidence": 0.939,
  //             "span": {
  //               "offset": 3730,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "mode",
  //             "polygon": [
  //               3.0058,
  //               9.8976,
  //               3.2139,
  //               9.8976,
  //               3.219,
  //               10.0093,
  //               3.0058,
  //               10.0093
  //             ],
  //             "confidence": 0.977,
  //             "span": {
  //               "offset": 3741,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "of",
  //             "polygon": [
  //               3.2342,
  //               9.8976,
  //               3.3002,
  //               9.8976,
  //               3.3002,
  //               10.0093,
  //               3.2393,
  //               10.0093
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 3746,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "accepting",
  //             "polygon": [
  //               3.3205,
  //               9.8976,
  //               3.6556,
  //               9.8926,
  //               3.6607,
  //               10.0093,
  //               3.3205,
  //               10.0093
  //             ],
  //             "confidence": 0.961,
  //             "span": {
  //               "offset": 3749,
  //               "length": 9
  //             }
  //           },
  //           {
  //             "content": "payment",
  //             "polygon": [
  //               3.681,
  //               9.8926,
  //               3.9958,
  //               9.8926,
  //               3.9958,
  //               10.0042,
  //               3.681,
  //               10.0093
  //             ],
  //             "confidence": 0.972,
  //             "span": {
  //               "offset": 3759,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "at",
  //             "polygon": [
  //               4.0161,
  //               9.8926,
  //               4.0771,
  //               9.8926,
  //               4.0821,
  //               10.0042,
  //               4.0161,
  //               10.0042
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 3767,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "onlinepayment.asianpaintsppg.com",
  //             "polygon": [
  //               4.1024,
  //               9.8926,
  //               5.3413,
  //               9.8926,
  //               5.3413,
  //               10.0042,
  //               4.1024,
  //               10.0042
  //             ],
  //             "confidence": 0.914,
  //             "span": {
  //               "offset": 3770,
  //               "length": 32
  //             }
  //           },
  //           {
  //             "content": "MR/BA",
  //             "polygon": [
  //               0.4976,
  //               10.0144,
  //               0.7413,
  //               10.0144,
  //               0.7413,
  //               10.121,
  //               0.5027,
  //               10.121
  //             ],
  //             "confidence": 0.504,
  //             "span": {
  //               "offset": 3803,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "CH",
  //             "polygon": [
  //               0.7667,
  //               10.0093,
  //               0.8733,
  //               10.0093,
  //               0.8784,
  //               10.121,
  //               0.7717,
  //               10.121
  //             ],
  //             "confidence": 0.599,
  //             "span": {
  //               "offset": 3809,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "NO",
  //             "polygon": [
  //               0.8987,
  //               10.0093,
  //               1.0053,
  //               10.0093,
  //               1.0053,
  //               10.121,
  //               0.8987,
  //               10.121
  //             ],
  //             "confidence": 0.964,
  //             "span": {
  //               "offset": 3812,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "and",
  //             "polygon": [
  //               1.0256,
  //               10.0093,
  //               1.1525,
  //               10.0093,
  //               1.1576,
  //               10.1159,
  //               1.0307,
  //               10.121
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 3815,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "date",
  //             "polygon": [
  //               1.1729,
  //               10.0093,
  //               1.3302,
  //               10.0093,
  //               1.3353,
  //               10.1159,
  //               1.1779,
  //               10.1159
  //             ],
  //             "confidence": 0.981,
  //             "span": {
  //               "offset": 3819,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "of",
  //             "polygon": [
  //               1.3506,
  //               10.0093,
  //               1.4115,
  //               10.0093,
  //               1.4115,
  //               10.1159,
  //               1.3556,
  //               10.1159
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 3824,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "manufacture",
  //             "polygon": [
  //               1.4318,
  //               10.0093,
  //               1.8786,
  //               10.0042,
  //               1.8837,
  //               10.1159,
  //               1.4318,
  //               10.1159
  //             ],
  //             "confidence": 0.948,
  //             "span": {
  //               "offset": 3827,
  //               "length": 11
  //             }
  //           },
  //           {
  //             "content": "appearing",
  //             "polygon": [
  //               1.8989,
  //               10.0042,
  //               2.2543,
  //               10.0042,
  //               2.2594,
  //               10.1159,
  //               1.904,
  //               10.1159
  //             ],
  //             "confidence": 0.964,
  //             "span": {
  //               "offset": 3839,
  //               "length": 9
  //             }
  //           },
  //           {
  //             "content": "on",
  //             "polygon": [
  //               2.2797,
  //               10.0042,
  //               2.3609,
  //               10.0042,
  //               2.366,
  //               10.1159,
  //               2.2797,
  //               10.1159
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 3849,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "the",
  //             "polygon": [
  //               2.3863,
  //               10.0042,
  //               2.498,
  //               10.0042,
  //               2.5031,
  //               10.1108,
  //               2.3863,
  //               10.1159
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 3852,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "package",
  //             "polygon": [
  //               2.5183,
  //               10.0042,
  //               2.8128,
  //               9.9992,
  //               2.8128,
  //               10.1108,
  //               2.5234,
  //               10.1108
  //             ],
  //             "confidence": 0.994,
  //             "span": {
  //               "offset": 3856,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "and",
  //             "polygon": [
  //               2.8331,
  //               9.9992,
  //               2.9601,
  //               9.9992,
  //               2.9651,
  //               10.1108,
  //               2.8382,
  //               10.1108
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 3864,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "cite",
  //             "polygon": [
  //               2.9804,
  //               9.9992,
  //               3.1022,
  //               9.9992,
  //               3.1073,
  //               10.1108,
  //               2.9854,
  //               10.1108
  //             ],
  //             "confidence": 0.985,
  //             "span": {
  //               "offset": 3868,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "the",
  //             "polygon": [
  //               3.1225,
  //               9.9992,
  //               3.2393,
  //               9.9992,
  //               3.2444,
  //               10.1108,
  //               3.1276,
  //               10.1108
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 3873,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "same",
  //             "polygon": [
  //               3.2596,
  //               9.9992,
  //               3.4373,
  //               9.9992,
  //               3.4424,
  //               10.1108,
  //               3.2647,
  //               10.1108
  //             ],
  //             "confidence": 0.991,
  //             "span": {
  //               "offset": 3877,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "in",
  //             "polygon": [
  //               3.4576,
  //               9.9992,
  //               3.5287,
  //               9.9992,
  //               3.5338,
  //               10.1057,
  //               3.4627,
  //               10.1108
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 3882,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "case",
  //             "polygon": [
  //               3.5541,
  //               9.9992,
  //               3.7013,
  //               9.9992,
  //               3.7064,
  //               10.1057,
  //               3.5541,
  //               10.1057
  //             ],
  //             "confidence": 0.975,
  //             "span": {
  //               "offset": 3885,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "of",
  //             "polygon": [
  //               3.7217,
  //               9.9992,
  //               3.7877,
  //               9.9992,
  //               3.7877,
  //               10.1057,
  //               3.7267,
  //               10.1057
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 3890,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "a",
  //             "polygon": [
  //               3.808,
  //               9.9992,
  //               3.8435,
  //               9.9992,
  //               3.8486,
  //               10.1057,
  //               3.813,
  //               10.1057
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 3893,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "complaint.",
  //             "polygon": [
  //               3.8638,
  //               9.9992,
  //               4.2395,
  //               9.9992,
  //               4.2395,
  //               10.1057,
  //               3.8689,
  //               10.1057
  //             ],
  //             "confidence": 0.925,
  //             "span": {
  //               "offset": 3895,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "Pendientee",
  //             "polygon": [
  //               0.2132,
  //               10.126,
  //               0.7362,
  //               10.1159,
  //               0.7362,
  //               10.2174,
  //               0.2132,
  //               10.2174
  //             ],
  //             "confidence": 0.505,
  //             "span": {
  //               "offset": 3906,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "are",
  //             "polygon": [
  //               0.7565,
  //               10.1159,
  //               0.8682,
  //               10.1159,
  //               0.8733,
  //               10.2174,
  //               0.7565,
  //               10.2174
  //             ],
  //             "confidence": 0.774,
  //             "span": {
  //               "offset": 3917,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "ox",
  //             "polygon": [
  //               0.8936,
  //               10.1159,
  //               0.9698,
  //               10.1159,
  //               0.9698,
  //               10.2174,
  //               0.8936,
  //               10.2174
  //             ],
  //             "confidence": 0.601,
  //             "span": {
  //               "offset": 3921,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "Depot,",
  //             "polygon": [
  //               0.9901,
  //               10.1159,
  //               1.2236,
  //               10.1108,
  //               1.2236,
  //               10.2174,
  //               0.9901,
  //               10.2174
  //             ],
  //             "confidence": 0.741,
  //             "span": {
  //               "offset": 3924,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "with",
  //             "polygon": [
  //               1.2439,
  //               10.1108,
  //               1.3963,
  //               10.1108,
  //               1.3963,
  //               10.2174,
  //               1.249,
  //               10.2174
  //             ],
  //             "confidence": 0.98,
  //             "span": {
  //               "offset": 3931,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "Freight",
  //             "polygon": [
  //               1.4166,
  //               10.1108,
  //               1.6653,
  //               10.1057,
  //               1.6653,
  //               10.2174,
  //               1.4166,
  //               10.2174
  //             ],
  //             "confidence": 0.967,
  //             "span": {
  //               "offset": 3936,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "being",
  //             "polygon": [
  //               1.6857,
  //               10.1057,
  //               1.8888,
  //               10.1057,
  //               1.8938,
  //               10.2174,
  //               1.6857,
  //               10.2174
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 3944,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "prepaid",
  //             "polygon": [
  //               1.9091,
  //               10.1057,
  //               2.1731,
  //               10.1057,
  //               2.1731,
  //               10.2174,
  //               1.9141,
  //               10.2174
  //             ],
  //             "confidence": 0.966,
  //             "span": {
  //               "offset": 3950,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "by",
  //             "polygon": [
  //               2.1934,
  //               10.1057,
  //               2.2797,
  //               10.1007,
  //               2.2797,
  //               10.2174,
  //               2.1985,
  //               10.2174
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 3958,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "the",
  //             "polygon": [
  //               2.3,
  //               10.1007,
  //               2.4117,
  //               10.1007,
  //               2.4168,
  //               10.2174,
  //               2.3,
  //               10.2174
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 3961,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "Company",
  //             "polygon": [
  //               2.4371,
  //               10.1007,
  //               2.7671,
  //               10.1007,
  //               2.7722,
  //               10.2174,
  //               2.4371,
  //               10.2174
  //             ],
  //             "confidence": 0.991,
  //             "span": {
  //               "offset": 3965,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "for",
  //             "polygon": [
  //               2.7874,
  //               10.1007,
  //               2.889,
  //               10.1007,
  //               2.889,
  //               10.2174,
  //               2.7925,
  //               10.2174
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 3973,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "delivery",
  //             "polygon": [
  //               2.9093,
  //               10.1007,
  //               3.1784,
  //               10.1007,
  //               3.1784,
  //               10.2123,
  //               2.9093,
  //               10.2123
  //             ],
  //             "confidence": 0.829,
  //             "span": {
  //               "offset": 3977,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "at",
  //             "polygon": [
  //               3.1987,
  //               10.1007,
  //               3.2647,
  //               10.1007,
  //               3.2647,
  //               10.2123,
  //               3.2038,
  //               10.2123
  //             ],
  //             "confidence": 0.945,
  //             "span": {
  //               "offset": 3986,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "the",
  //             "polygon": [
  //               3.285,
  //               10.1007,
  //               3.3967,
  //               10.1007,
  //               3.4018,
  //               10.2123,
  //               3.285,
  //               10.2123
  //             ],
  //             "confidence": 0.698,
  //             "span": {
  //               "offset": 3989,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "Destination",
  //             "polygon": [
  //               3.417,
  //               10.1007,
  //               3.7927,
  //               10.1007,
  //               3.7978,
  //               10.2073,
  //               3.4221,
  //               10.2123
  //             ],
  //             "confidence": 0.949,
  //             "span": {
  //               "offset": 3993,
  //               "length": 11
  //             }
  //           },
  //           {
  //             "content": "...",
  //             "polygon": [
  //               3.8181,
  //               10.1007,
  //               3.8943,
  //               10.1007,
  //               3.8994,
  //               10.2073,
  //               3.8181,
  //               10.2073
  //             ],
  //             "confidence": 0.55,
  //             "span": {
  //               "offset": 4005,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "no",
  //             "polygon": [
  //               0.2234,
  //               10.2276,
  //               0.3249,
  //               10.2276,
  //               0.3249,
  //               10.3139,
  //               0.2234,
  //               10.3139
  //             ],
  //             "confidence": 0.157,
  //             "span": {
  //               "offset": 4009,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "way",
  //             "polygon": [
  //               0.3706,
  //               10.2276,
  //               0.4874,
  //               10.2225,
  //               0.4874,
  //               10.3139,
  //               0.3706,
  //               10.3139
  //             ],
  //             "confidence": 0.168,
  //             "span": {
  //               "offset": 4012,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "it",
  //             "polygon": [
  //               0.5077,
  //               10.2225,
  //               0.594,
  //               10.2225,
  //               0.594,
  //               10.3189,
  //               0.5077,
  //               10.3139
  //             ],
  //             "confidence": 0.181,
  //             "span": {
  //               "offset": 4016,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "is",
  //             "polygon": [
  //               0.6194,
  //               10.2225,
  //               0.6702,
  //               10.2225,
  //               0.6702,
  //               10.3189,
  //               0.6194,
  //               10.3189
  //             ],
  //             "confidence": 0.2,
  //             "span": {
  //               "offset": 4019,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "discretion,",
  //             "polygon": [
  //               0.6956,
  //               10.2225,
  //               1.0764,
  //               10.2174,
  //               1.0764,
  //               10.324,
  //               0.6956,
  //               10.3189
  //             ],
  //             "confidence": 0.531,
  //             "span": {
  //               "offset": 4022,
  //               "length": 11
  //             }
  //           },
  //           {
  //             "content": "may",
  //             "polygon": [
  //               1.0967,
  //               10.2174,
  //               1.2287,
  //               10.2174,
  //               1.2287,
  //               10.324,
  //               1.0967,
  //               10.324
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 4034,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "compensate",
  //             "polygon": [
  //               1.2541,
  //               10.2174,
  //               1.6806,
  //               10.2123,
  //               1.6806,
  //               10.3291,
  //               1.2541,
  //               10.324
  //             ],
  //             "confidence": 0.943,
  //             "span": {
  //               "offset": 4038,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "for",
  //             "polygon": [
  //               1.7009,
  //               10.2123,
  //               1.7872,
  //               10.2123,
  //               1.7872,
  //               10.3291,
  //               1.7009,
  //               10.3291
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 4049,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "Leakages",
  //             "polygon": [
  //               1.8126,
  //               10.2123,
  //               2.1426,
  //               10.2073,
  //               2.1426,
  //               10.3291,
  //               1.8126,
  //               10.3291
  //             ],
  //             "confidence": 0.732,
  //             "span": {
  //               "offset": 4053,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "and",
  //             "polygon": [
  //               2.168,
  //               10.2073,
  //               2.2848,
  //               10.2073,
  //               2.2848,
  //               10.3291,
  //               2.168,
  //               10.3291
  //             ],
  //             "confidence": 0.993,
  //             "span": {
  //               "offset": 4062,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "Breakages",
  //             "polygon": [
  //               2.3051,
  //               10.2073,
  //               2.6554,
  //               10.2022,
  //               2.6554,
  //               10.3291,
  //               2.3051,
  //               10.3291
  //             ],
  //             "confidence": 0.951,
  //             "span": {
  //               "offset": 4066,
  //               "length": 9
  //             }
  //           },
  //           {
  //             "content": "that",
  //             "polygon": [
  //               2.6808,
  //               10.2022,
  //               2.828,
  //               10.2022,
  //               2.828,
  //               10.3291,
  //               2.6808,
  //               10.3291
  //             ],
  //             "confidence": 0.964,
  //             "span": {
  //               "offset": 4076,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "occur",
  //             "polygon": [
  //               2.8484,
  //               10.2022,
  //               3.0261,
  //               10.2022,
  //               3.0261,
  //               10.3291,
  //               2.8484,
  //               10.3291
  //             ],
  //             "confidence": 0.888,
  //             "span": {
  //               "offset": 4081,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "in",
  //             "polygon": [
  //               3.0514,
  //               10.2022,
  //               3.1225,
  //               10.1971,
  //               3.1225,
  //               10.3291,
  //               3.0514,
  //               10.3291
  //             ],
  //             "confidence": 0.515,
  //             "span": {
  //               "offset": 4087,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "transit",
  //             "polygon": [
  //               3.1428,
  //               10.1971,
  //               3.3713,
  //               10.1971,
  //               3.3713,
  //               10.3291,
  //               3.1428,
  //               10.3291
  //             ],
  //             "confidence": 0.706,
  //             "span": {
  //               "offset": 4090,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "after",
  //             "polygon": [
  //               3.3916,
  //               10.1971,
  //               3.5389,
  //               10.1971,
  //               3.5389,
  //               10.3291,
  //               3.3916,
  //               10.3291
  //             ],
  //             "confidence": 0.664,
  //             "span": {
  //               "offset": 4098,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "evaluation",
  //             "polygon": [
  //               3.5643,
  //               10.1971,
  //               3.9247,
  //               10.192,
  //               3.9247,
  //               10.3291,
  //               3.5643,
  //               10.3291
  //             ],
  //             "confidence": 0.732,
  //             "span": {
  //               "offset": 4104,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "of",
  //             "polygon": [
  //               3.9501,
  //               10.192,
  //               4.006,
  //               10.192,
  //               4.006,
  //               10.3291,
  //               3.9501,
  //               10.3291
  //             ],
  //             "confidence": 0.369,
  //             "span": {
  //               "offset": 4115,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "the",
  //             "polygon": [
  //               4.0263,
  //               10.192,
  //               4.1431,
  //               10.192,
  //               4.1431,
  //               10.3291,
  //               4.0263,
  //               10.3291
  //             ],
  //             "confidence": 0.69,
  //             "span": {
  //               "offset": 4118,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "chain",
  //             "polygon": [
  //               4.1685,
  //               10.192,
  //               4.3868,
  //               10.192,
  //               4.3868,
  //               10.3291,
  //               4.1685,
  //               10.3291
  //             ],
  //             "confidence": 0.158,
  //             "span": {
  //               "offset": 4122,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "die",
  //             "polygon": [
  //               4.5239,
  //               10.187,
  //               4.9148,
  //               10.187,
  //               4.9148,
  //               10.324,
  //               4.5239,
  //               10.324
  //             ],
  //             "confidence": 0.157,
  //             "span": {
  //               "offset": 4128,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "Frage",
  //             "polygon": [
  //               4.9757,
  //               10.187,
  //               5.2753,
  //               10.187,
  //               5.2753,
  //               10.3189,
  //               4.9757,
  //               10.324
  //             ],
  //             "confidence": 0.173,
  //             "span": {
  //               "offset": 4132,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "&",
  //             "polygon": [
  //               5.3007,
  //               10.187,
  //               5.3515,
  //               10.187,
  //               5.3515,
  //               10.3189,
  //               5.3007,
  //               10.3189
  //             ],
  //             "confidence": 0.847,
  //             "span": {
  //               "offset": 4138,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "Shortages",
  //             "polygon": [
  //               5.3768,
  //               10.187,
  //               5.7119,
  //               10.1819,
  //               5.7119,
  //               10.3139,
  //               5.3768,
  //               10.3189
  //             ],
  //             "confidence": 0.742,
  //             "span": {
  //               "offset": 4140,
  //               "length": 9
  //             }
  //           },
  //           {
  //             "content": "that",
  //             "polygon": [
  //               5.7323,
  //               10.1819,
  //               5.8947,
  //               10.1819,
  //               5.8947,
  //               10.3139,
  //               5.7323,
  //               10.3139
  //             ],
  //             "confidence": 0.811,
  //             "span": {
  //               "offset": 4150,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "occur",
  //             "polygon": [
  //               5.9201,
  //               10.1819,
  //               6.0978,
  //               10.1819,
  //               6.0978,
  //               10.3088,
  //               5.9201,
  //               10.3139
  //             ],
  //             "confidence": 0.817,
  //             "span": {
  //               "offset": 4155,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "at",
  //             "polygon": [
  //               6.1232,
  //               10.1819,
  //               6.1892,
  //               10.1819,
  //               6.1892,
  //               10.3088,
  //               6.1232,
  //               10.3088
  //             ],
  //             "confidence": 0.898,
  //             "span": {
  //               "offset": 4161,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "Dealer",
  //             "polygon": [
  //               6.2146,
  //               10.1819,
  //               6.4228,
  //               10.1819,
  //               6.4228,
  //               10.3037,
  //               6.2146,
  //               10.3088
  //             ],
  //             "confidence": 0.885,
  //             "span": {
  //               "offset": 4164,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "Shop",
  //             "polygon": [
  //               6.4482,
  //               10.1819,
  //               6.6259,
  //               10.1768,
  //               6.6259,
  //               10.3037,
  //               6.4482,
  //               10.3037
  //             ],
  //             "confidence": 0.936,
  //             "span": {
  //               "offset": 4171,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "or",
  //             "polygon": [
  //               6.6462,
  //               10.1768,
  //               6.7172,
  //               10.1768,
  //               6.7172,
  //               10.2986,
  //               6.6462,
  //               10.3037
  //             ],
  //             "confidence": 0.917,
  //             "span": {
  //               "offset": 4176,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "Site",
  //             "polygon": [
  //               6.7426,
  //               10.1768,
  //               6.8746,
  //               10.1768,
  //               6.8746,
  //               10.2986,
  //               6.7426,
  //               10.2986
  //             ],
  //             "confidence": 0.932,
  //             "span": {
  //               "offset": 4179,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "will",
  //             "polygon": [
  //               6.895,
  //               10.1768,
  //               7.0117,
  //               10.1768,
  //               7.0117,
  //               10.2935,
  //               6.895,
  //               10.2986
  //             ],
  //             "confidence": 0.98,
  //             "span": {
  //               "offset": 4184,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "be",
  //             "polygon": [
  //               7.0371,
  //               10.1768,
  //               7.1082,
  //               10.1768,
  //               7.1082,
  //               10.2935,
  //               7.0371,
  //               10.2935
  //             ],
  //             "confidence": 0.955,
  //             "span": {
  //               "offset": 4189,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "to",
  //             "polygon": [
  //               7.1285,
  //               10.1768,
  //               7.2148,
  //               10.1768,
  //               7.2148,
  //               10.2935,
  //               7.1285,
  //               10.2935
  //             ],
  //             "confidence": 0.961,
  //             "span": {
  //               "offset": 4192,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "Dealer",
  //             "polygon": [
  //               7.2351,
  //               10.1768,
  //               7.4331,
  //               10.1768,
  //               7.4331,
  //               10.2885,
  //               7.2351,
  //               10.2935
  //             ],
  //             "confidence": 0.895,
  //             "span": {
  //               "offset": 4195,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "/",
  //             "polygon": [
  //               7.4535,
  //               10.1768,
  //               7.4941,
  //               10.1768,
  //               7.4941,
  //               10.2834,
  //               7.4535,
  //               10.2885
  //             ],
  //             "confidence": 0.99,
  //             "span": {
  //               "offset": 4202,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "Purchaser's",
  //             "polygon": [
  //               7.5144,
  //               10.1768,
  //               7.9104,
  //               10.1768,
  //               7.9104,
  //               10.2783,
  //               7.5144,
  //               10.2834
  //             ],
  //             "confidence": 0.862,
  //             "span": {
  //               "offset": 4204,
  //               "length": 11
  //             }
  //           },
  //           {
  //             "content": "A/",
  //             "polygon": [
  //               7.9358,
  //               10.1768,
  //               8.0221,
  //               10.1768,
  //               8.0221,
  //               10.2732,
  //               7.9358,
  //               10.2783
  //             ],
  //             "confidence": 0.943,
  //             "span": {
  //               "offset": 4216,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "1-",
  //             "polygon": [
  //               0.1472,
  //               10.4001,
  //               0.2386,
  //               10.4052,
  //               0.2437,
  //               10.527,
  //               0.1472,
  //               10.527
  //             ],
  //             "confidence": 0.504,
  //             "span": {
  //               "offset": 4219,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "Hhín",
  //             "polygon": [
  //               0.2996,
  //               10.4052,
  //               0.4366,
  //               10.4103,
  //               0.4366,
  //               10.527,
  //               0.2996,
  //               10.527
  //             ],
  //             "confidence": 0.504,
  //             "span": {
  //               "offset": 4222,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "Đồ",
  //             "polygon": [
  //               0.457,
  //               10.4103,
  //               0.5534,
  //               10.4103,
  //               0.5534,
  //               10.522,
  //               0.462,
  //               10.527
  //             ],
  //             "confidence": 0.504,
  //             "span": {
  //               "offset": 4227,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "Sức",
  //             "polygon": [
  //               0.5737,
  //               10.4103,
  //               0.7108,
  //               10.4154,
  //               0.7108,
  //               10.522,
  //               0.5737,
  //               10.522
  //             ],
  //             "confidence": 0.524,
  //             "span": {
  //               "offset": 4230,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "along",
  //             "polygon": [
  //               0.7311,
  //               10.4154,
  //               0.9342,
  //               10.4154,
  //               0.9393,
  //               10.522,
  //               0.7362,
  //               10.522
  //             ],
  //             "confidence": 0.518,
  //             "span": {
  //               "offset": 4234,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "with",
  //             "polygon": [
  //               0.9596,
  //               10.4154,
  //               1.1018,
  //               10.4154,
  //               1.1018,
  //               10.522,
  //               0.9596,
  //               10.522
  //             ],
  //             "confidence": 0.963,
  //             "span": {
  //               "offset": 4240,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "Hardeners",
  //             "polygon": [
  //               1.1221,
  //               10.4154,
  //               1.508,
  //               10.4154,
  //               1.508,
  //               10.522,
  //               1.1272,
  //               10.522
  //             ],
  //             "confidence": 0.778,
  //             "span": {
  //               "offset": 4245,
  //               "length": 9
  //             }
  //           },
  //           {
  //             "content": "MATT",
  //             "polygon": [
  //               2.9753,
  //               10.4103,
  //               3.3155,
  //               10.4103,
  //               3.3205,
  //               10.5676,
  //               2.9804,
  //               10.5727
  //             ],
  //             "confidence": 0.571,
  //             "span": {
  //               "offset": 4255,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "5.",
  //             "polygon": [
  //               3.8638,
  //               10.4052,
  //               3.9704,
  //               10.4001,
  //               3.9755,
  //               10.5727,
  //               3.8689,
  //               10.5778
  //             ],
  //             "confidence": 0.508,
  //             "span": {
  //               "offset": 4260,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "DIC-SSC",
  //             "polygon": [
  //               4.006,
  //               10.3951,
  //               4.5492,
  //               10.3798,
  //               4.5543,
  //               10.5575,
  //               4.0111,
  //               10.5727
  //             ],
  //             "confidence": 0.572,
  //             "span": {
  //               "offset": 4263,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "TALEGAOR",
  //             "polygon": [
  //               4.5848,
  //               10.3798,
  //               5.189,
  //               10.3697,
  //               5.1941,
  //               10.5473,
  //               4.5899,
  //               10.5575
  //             ],
  //             "confidence": 0.555,
  //             "span": {
  //               "offset": 4271,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "Total",
  //             "polygon": [
  //               0.0711,
  //               10.6844,
  //               0.2894,
  //               10.6793,
  //               0.2945,
  //               10.791,
  //               0.0762,
  //               10.7859
  //             ],
  //             "confidence": 0.842,
  //             "span": {
  //               "offset": 4280,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "Amount",
  //             "polygon": [
  //               0.3148,
  //               10.6793,
  //               0.655,
  //               10.6742,
  //               0.66,
  //               10.791,
  //               0.3148,
  //               10.791
  //             ],
  //             "confidence": 0.961,
  //             "span": {
  //               "offset": 4286,
  //               "length": 6
  //             }
  //           },
  //           {
  //             "content": "includes",
  //             "polygon": [
  //               0.6804,
  //               10.6742,
  //               1.051,
  //               10.6742,
  //               1.0561,
  //               10.791,
  //               0.6804,
  //               10.791
  //             ],
  //             "confidence": 0.927,
  //             "span": {
  //               "offset": 4293,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "Commercial",
  //             "polygon": [
  //               1.0764,
  //               10.6742,
  //               1.5892,
  //               10.6692,
  //               1.5892,
  //               10.791,
  //               1.0764,
  //               10.791
  //             ],
  //             "confidence": 0.974,
  //             "span": {
  //               "offset": 4302,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "Rounding",
  //             "polygon": [
  //               1.6095,
  //               10.6692,
  //               2.0411,
  //               10.6692,
  //               2.0411,
  //               10.791,
  //               1.6146,
  //               10.791
  //             ],
  //             "confidence": 0.987,
  //             "span": {
  //               "offset": 4313,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "as",
  //             "polygon": [
  //               2.0614,
  //               10.6692,
  //               2.1477,
  //               10.6692,
  //               2.1477,
  //               10.791,
  //               2.0614,
  //               10.791
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 4322,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "applicable",
  //             "polygon": [
  //               2.1731,
  //               10.6692,
  //               2.6402,
  //               10.6641,
  //               2.6402,
  //               10.791,
  //               2.1731,
  //               10.791
  //             ],
  //             "confidence": 0.981,
  //             "span": {
  //               "offset": 4325,
  //               "length": 10
  //             }
  //           },
  //           {
  //             "content": "TAPPSTAL",
  //             "polygon": [
  //               4.1228,
  //               10.5981,
  //               4.7016,
  //               10.593,
  //               4.7117,
  //               10.7504,
  //               4.1228,
  //               10.7504
  //             ],
  //             "confidence": 0.316,
  //             "span": {
  //               "offset": 4336,
  //               "length": 8
  //             }
  //           },
  //           {
  //             "content": "15859",
  //             "polygon": [
  //               3.9501,
  //               10.7808,
  //               4.7422,
  //               10.7554,
  //               4.7473,
  //               10.9585,
  //               3.9603,
  //               10.9788
  //             ],
  //             "confidence": 0.776,
  //             "span": {
  //               "offset": 4345,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "Page",
  //             "polygon": [
  //               6.9457,
  //               10.6793,
  //               7.2758,
  //               10.6793,
  //               7.2808,
  //               10.8366,
  //               6.9508,
  //               10.8417
  //             ],
  //             "confidence": 0.992,
  //             "span": {
  //               "offset": 4351,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "1",
  //             "polygon": [
  //               7.3214,
  //               10.6793,
  //               7.3925,
  //               10.6793,
  //               7.3976,
  //               10.8366,
  //               7.3214,
  //               10.8366
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 4356,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "of",
  //             "polygon": [
  //               7.423,
  //               10.6793,
  //               7.5601,
  //               10.6793,
  //               7.5652,
  //               10.8417,
  //               7.4281,
  //               10.8366
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 4358,
  //               "length": 2
  //             }
  //           },
  //           {
  //             "content": "1",
  //             "polygon": [
  //               7.5905,
  //               10.6793,
  //               7.6565,
  //               10.6793,
  //               7.6616,
  //               10.8417,
  //               7.5956,
  //               10.8417
  //             ],
  //             "confidence": 0.995,
  //             "span": {
  //               "offset": 4361,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "TIMAI",
  //             "polygon": [
  //               2.9702,
  //               11.0295,
  //               3.1987,
  //               11.0194,
  //               3.1987,
  //               11.1767,
  //               2.9753,
  //               11.1767
  //             ],
  //             "confidence": 0.236,
  //             "span": {
  //               "offset": 4363,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "9'30",
  //             "polygon": [
  //               3.285,
  //               11.0143,
  //               3.742,
  //               10.9889,
  //               3.742,
  //               11.1767,
  //               3.285,
  //               11.1767
  //             ],
  //             "confidence": 0.4,
  //             "span": {
  //               "offset": 4369,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "DATE:",
  //             "polygon": [
  //               3.879,
  //               10.9838,
  //               4.1532,
  //               10.9737,
  //               4.1532,
  //               11.1666,
  //               3.879,
  //               11.1716
  //             ],
  //             "confidence": 0.592,
  //             "span": {
  //               "offset": 4374,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "02/3/24",
  //             "polygon": [
  //               4.1888,
  //               10.9737,
  //               5.0773,
  //               10.9483,
  //               5.0722,
  //               11.1361,
  //               4.1888,
  //               11.1666
  //             ],
  //             "confidence": 0.915,
  //             "span": {
  //               "offset": 4380,
  //               "length": 7
  //             }
  //           },
  //           {
  //             "content": "Sec.",
  //             "polygon": [
  //               2.9601,
  //               11.2326,
  //               3.1327,
  //               11.2376,
  //               3.1327,
  //               11.3544,
  //               2.9601,
  //               11.3594
  //             ],
  //             "confidence": 0.93,
  //             "span": {
  //               "offset": 4388,
  //               "length": 4
  //             }
  //           },
  //           {
  //             "content": "Supir",
  //             "polygon": [
  //               3.153,
  //               11.2376,
  //               3.3815,
  //               11.2376,
  //               3.3865,
  //               11.3594,
  //               3.1581,
  //               11.3544
  //             ],
  //             "confidence": 0.593,
  //             "span": {
  //               "offset": 4393,
  //               "length": 5
  //             }
  //           },
  //           {
  //             "content": "ame",
  //             "polygon": [
  //               3.4069,
  //               11.2376,
  //               3.5896,
  //               11.2275,
  //               3.5896,
  //               11.3645,
  //               3.4119,
  //               11.3594
  //             ],
  //             "confidence": 0.959,
  //             "span": {
  //               "offset": 4399,
  //               "length": 3
  //             }
  //           },
  //           {
  //             "content": "p",
  //             "polygon": [
  //               4.1228,
  //               11.2072,
  //               4.2243,
  //               11.2072,
  //               4.2294,
  //               11.3848,
  //               4.1278,
  //               11.3899
  //             ],
  //             "confidence": 0.601,
  //             "span": {
  //               "offset": 4403,
  //               "length": 1
  //             }
  //           },
  //           {
  //             "content": "SIG",
  //             "polygon": [
  //               4.4375,
  //               11.197,
  //               4.6153,
  //               11.197,
  //               4.6203,
  //               11.3594,
  //               4.4375,
  //               11.3594
  //             ],
  //             "confidence": 0.911,
  //             "span": {
  //               "offset": 4405,
  //               "length": 3
  //             }
  //           }
  //         ],
  //         "lines": [
  //           {
  //             "content": "TWI0003278",
  //             "polygon": [
  //               5.0468,
  //               0.0355,
  //               6.8899,
  //               0.0355,
  //               6.8899,
  //               0.2386,
  //               5.0468,
  //               0.2436
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 0,
  //                 "length": 10
  //               }
  //             ]
  //           },
  //           {
  //             "content": "6PG",
  //             "polygon": [
  //               0.9291,
  //               0.3807,
  //               1.2287,
  //               0.3705,
  //               1.2287,
  //               0.5736,
  //               0.9241,
  //               0.5837
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 11,
  //                 "length": 3
  //               }
  //             ]
  //           },
  //           {
  //             "content": "TAX INVOICE",
  //             "polygon": [
  //               1.6146,
  //               0.2639,
  //               2.2695,
  //               0.2639,
  //               2.2695,
  //               0.3807,
  //               1.6146,
  //               0.3807
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 15,
  //                 "length": 11
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Original for Recipient",
  //             "polygon": [
  //               3.2241,
  //               0.269,
  //               4.2192,
  //               0.269,
  //               4.2192,
  //               0.401,
  //               3.2241,
  //               0.401
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 27,
  //                 "length": 22
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Whether Tax is Payable under Reverse Charge Mechanism: No",
  //             "polygon": [
  //               4.6254,
  //               0.2741,
  //               7.489,
  //               0.2842,
  //               7.489,
  //               0.4162,
  //               4.6254,
  //               0.401
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 50,
  //                 "length": 57
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Supplying Location Address",
  //             "polygon": [
  //               1.7567,
  //               0.5177,
  //               3.1631,
  //               0.5177,
  //               3.1631,
  //               0.6548,
  //               1.7567,
  //               0.6548
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 108,
  //                 "length": 26
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Invoice Details",
  //             "polygon": [
  //               3.3662,
  //               0.5228,
  //               4.1126,
  //               0.5279,
  //               4.1126,
  //               0.6497,
  //               3.3662,
  //               0.6446
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 135,
  //                 "length": 15
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Order No .: 5120189447",
  //             "polygon": [
  //               4.8133,
  //               0.4923,
  //               5.976,
  //               0.5025,
  //               5.976,
  //               0.6294,
  //               4.8133,
  //               0.6192
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 151,
  //                 "length": 22
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Asian Paints PPG Pvt Ltd-5555",
  //             "polygon": [
  //               1.6146,
  //               0.7461,
  //               3.021,
  //               0.7411,
  //               3.021,
  //               0.8629,
  //               1.6146,
  //               0.8679
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 174,
  //                 "length": 29
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Invoice",
  //             "polygon": [
  //               3.3662,
  //               0.7512,
  //               3.747,
  //               0.7512,
  //               3.747,
  //               0.8679,
  //               3.3662,
  //               0.8629
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 204,
  //                 "length": 7
  //               }
  //             ]
  //           },
  //           {
  //             "content": "MH2351025135",
  //             "polygon": [
  //               3.8892,
  //               0.7715,
  //               4.6965,
  //               0.7715,
  //               4.6965,
  //               0.8984,
  //               3.8892,
  //               0.8984
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 212,
  //                 "length": 12
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Order Date : 29.02.2024",
  //             "polygon": [
  //               4.8082,
  //               0.7461,
  //               5.9252,
  //               0.7512,
  //               5.9201,
  //               0.8832,
  //               4.8082,
  //               0.8781
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 225,
  //                 "length": 23
  //               }
  //             ]
  //           },
  //           {
  //             "content": "B3 Gala,Sairaj Warehouse,",
  //             "polygon": [
  //               1.6197,
  //               0.8781,
  //               2.8331,
  //               0.8781,
  //               2.8331,
  //               1.0101,
  //               1.6197,
  //               1.005
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 249,
  //                 "length": 25
  //               }
  //             ]
  //           },
  //           {
  //             "content": "No .:",
  //             "polygon": [
  //               3.3713,
  //               0.8882,
  //               3.5795,
  //               0.8933,
  //               3.5795,
  //               0.9948,
  //               3.3713,
  //               0.9898
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 275,
  //                 "length": 5
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Opp All Saints High School, Lonar",
  //             "polygon": [
  //               1.6095,
  //               1.0101,
  //               3.153,
  //               1.0101,
  //               3.153,
  //               1.1522,
  //               1.6095,
  //               1.1522
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 281,
  //                 "length": 33
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Delivery :",
  //             "polygon": [
  //               4.8031,
  //               0.9898,
  //               5.2601,
  //               0.9847,
  //               5.2601,
  //               1.1573,
  //               4.8031,
  //               1.1522
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 315,
  //                 "length": 10
  //               }
  //             ]
  //           },
  //           {
  //             "content": "0402891877",
  //             "polygon": [
  //               5.3464,
  //               1.005,
  //               5.9658,
  //               1.005,
  //               5.9658,
  //               1.1319,
  //               5.3464,
  //               1.1268
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 326,
  //                 "length": 10
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Road,-",
  //             "polygon": [
  //               1.6095,
  //               1.1522,
  //               1.9141,
  //               1.1522,
  //               1.9141,
  //               1.2689,
  //               1.6095,
  //               1.2639
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 337,
  //                 "length": 6
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Bhawale Village,Bhiwandi 421302",
  //             "polygon": [
  //               1.6095,
  //               1.2791,
  //               3.1835,
  //               1.2791,
  //               3.1835,
  //               1.4161,
  //               1.6095,
  //               1.4212
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 344,
  //                 "length": 31
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Invoice Date: 29.02.2024",
  //             "polygon": [
  //               3.3713,
  //               1.1573,
  //               4.6914,
  //               1.1522,
  //               4.6914,
  //               1.2791,
  //               3.3713,
  //               1.2791
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 376,
  //                 "length": 24
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Del. Date: 29.02.2024",
  //             "polygon": [
  //               4.8082,
  //               1.2537,
  //               5.8897,
  //               1.2537,
  //               5.8897,
  //               1.3857,
  //               4.8082,
  //               1.3755
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 401,
  //                 "length": 21
  //               }
  //             ]
  //           },
  //           {
  //             "content": "ARegistered Address:",
  //             "polygon": [
  //               0.066,
  //               1.4567,
  //               1.0459,
  //               1.4567,
  //               1.0459,
  //               1.6141,
  //               0.066,
  //               1.609
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 423,
  //                 "length": 20
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Category : B2B",
  //             "polygon": [
  //               3.3713,
  //               1.411,
  //               4.1024,
  //               1.411,
  //               4.1024,
  //               1.5379,
  //               3.3713,
  //               1.5379
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 444,
  //                 "length": 14
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Asan Paints PPG Pvt Ltd",
  //             "polygon": [
  //               0.0762,
  //               1.6141,
  //               1.2287,
  //               1.6141,
  //               1.2287,
  //               1.7308,
  //               0.0762,
  //               1.7308
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 459,
  //                 "length": 23
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Transaction Type : Bill To",
  //             "polygon": [
  //               3.3612,
  //               1.5785,
  //               4.6153,
  //               1.5785,
  //               4.6153,
  //               1.7105,
  //               3.3612,
  //               1.7105
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 483,
  //                 "length": 26
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Int. Ref. No: 1360475518",
  //             "polygon": [
  //               4.8133,
  //               1.5075,
  //               5.9709,
  //               1.5075,
  //               5.9709,
  //               1.6344,
  //               4.8133,
  //               1.6293
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 510,
  //                 "length": 24
  //               }
  //             ]
  //           },
  //           {
  //             "content": "IGA Shanti Nagar, Santacruz",
  //             "polygon": [
  //               0.0355,
  //               1.7359,
  //               1.3759,
  //               1.746,
  //               1.3709,
  //               1.8831,
  //               0.0355,
  //               1.8679
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 535,
  //                 "length": 27
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Ship To",
  //             "polygon": [
  //               3.3713,
  //               1.7207,
  //               3.747,
  //               1.7207,
  //               3.742,
  //               1.8425,
  //               3.3713,
  //               1.8374
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 563,
  //                 "length": 7
  //               }
  //             ]
  //           },
  //           {
  //             "content": "06L043980 /",
  //             "polygon": [
  //               5.3261,
  //               1.7613,
  //               5.9404,
  //               1.7562,
  //               5.9404,
  //               1.878,
  //               5.3261,
  //               1.878
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 571,
  //                 "length": 11
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Ktast)",
  //             "polygon": [
  //               0.0508,
  //               1.8831,
  //               0.3554,
  //               1.8882,
  //               0.3554,
  //               2.0049,
  //               0.0559,
  //               2.0049
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 583,
  //                 "length": 6
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Reference :",
  //             "polygon": [
  //               4.8082,
  //               1.812,
  //               5.3616,
  //               1.807,
  //               5.3616,
  //               1.944,
  //               4.8082,
  //               1.9491
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 590,
  //                 "length": 11
  //               }
  //             ]
  //           },
  //           {
  //             "content": "PAN No. : AAJCA7128D",
  //             "polygon": [
  //               1.5993,
  //               1.9998,
  //               2.6605,
  //               1.9998,
  //               2.6605,
  //               2.1216,
  //               1.5993,
  //               2.1216
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 602,
  //                 "length": 20
  //               }
  //             ]
  //           },
  //           {
  //             "content": "29.02.2024",
  //             "polygon": [
  //               5.3261,
  //               1.8932,
  //               5.8693,
  //               1.8932,
  //               5.8693,
  //               2.0049,
  //               5.3261,
  //               1.9998
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 623,
  //                 "length": 10
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Virtua: 400055",
  //             "polygon": [
  //               0.0863,
  //               2.0151,
  //               0.9088,
  //               2.0201,
  //               0.9088,
  //               2.1318,
  //               0.0863,
  //               2.1267
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 634,
  //                 "length": 14
  //               }
  //             ]
  //           },
  //           {
  //             "content": "State: Maharashtra",
  //             "polygon": [
  //               1.5993,
  //               2.1318,
  //               2.5336,
  //               2.1318,
  //               2.5336,
  //               2.2435,
  //               1.5993,
  //               2.2435
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 649,
  //                 "length": 18
  //               }
  //             ]
  //           },
  //           {
  //             "content": "State Code : 27",
  //             "polygon": [
  //               1.5892,
  //               2.2536,
  //               2.3152,
  //               2.2536,
  //               2.3152,
  //               2.3653,
  //               1.5943,
  //               2.3704
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 668,
  //                 "length": 15
  //               }
  //             ]
  //           },
  //           {
  //             "content": "GSTIN : 27AAJCA7128D1ZS",
  //             "polygon": [
  //               1.5993,
  //               2.3551,
  //               2.889,
  //               2.3551,
  //               2.889,
  //               2.4719,
  //               1.5993,
  //               2.4719
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 684,
  //                 "length": 23
  //               }
  //             ]
  //           },
  //           {
  //             "content": "1360475518",
  //             "polygon": [
  //               3.5947,
  //               2.2638,
  //               4.4122,
  //               2.2688,
  //               4.4071,
  //               2.3856,
  //               3.5947,
  //               2.3805
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 708,
  //                 "length": 10
  //               }
  //             ]
  //           },
  //           {
  //             "content": "IRN No .: 997c0076d4aca66ab66779a21946a80da0f4ab21152e474626611391bf4eca1b",
  //             "polygon": [
  //               0.1117,
  //               2.5937,
  //               4.4528,
  //               2.5937,
  //               4.4528,
  //               2.7155,
  //               0.1117,
  //               2.7155
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 719,
  //                 "length": 74
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Acknowledgement No. : 122420388464075 Acknowledgement Date : 2024-02-29",
  //             "polygon": [
  //               0.1117,
  //               2.7358,
  //               4.1278,
  //               2.7307,
  //               4.1278,
  //               2.8526,
  //               0.1117,
  //               2.8576
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 794,
  //                 "length": 71
  //               }
  //             ]
  //           },
  //           {
  //             "content": "QR Type : IRN",
  //             "polygon": [
  //               6.0014,
  //               2.7916,
  //               6.6665,
  //               2.7967,
  //               6.6665,
  //               2.9185,
  //               6.0014,
  //               2.9135
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 866,
  //                 "length": 13
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Bill To Party",
  //             "polygon": [
  //               0.787,
  //               2.9997,
  //               1.4724,
  //               2.9997,
  //               1.4724,
  //               3.1216,
  //               0.787,
  //               3.1165
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 880,
  //                 "length": 13
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Ship To Party",
  //             "polygon": [
  //               2.9448,
  //               2.9947,
  //               3.7013,
  //               2.9997,
  //               3.7013,
  //               3.1266,
  //               2.9448,
  //               3.1165
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 894,
  //                 "length": 13
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Details",
  //             "polygon": [
  //               5.1382,
  //               2.9997,
  //               5.5342,
  //               2.9997,
  //               5.5342,
  //               3.1165,
  //               5.1382,
  //               3.1114
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 908,
  //                 "length": 7
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Remarks",
  //             "polygon": [
  //               6.6614,
  //               3.0099,
  //               7.1641,
  //               3.0048,
  //               7.1641,
  //               3.1216,
  //               6.6614,
  //               3.1266
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 916,
  //                 "length": 7
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Customer",
  //             "polygon": [
  //               0.0914,
  //               3.1419,
  //               0.5839,
  //               3.1469,
  //               0.5839,
  //               3.2485,
  //               0.0914,
  //               3.2434
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 924,
  //                 "length": 8
  //               }
  //             ]
  //           },
  //           {
  //             "content": "0000566518",
  //             "polygon": [
  //               0.8733,
  //               3.1368,
  //               1.5029,
  //               3.1368,
  //               1.5029,
  //               3.2485,
  //               0.8733,
  //               3.2485
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 933,
  //                 "length": 10
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Customer",
  //             "polygon": [
  //               2.2188,
  //               3.1469,
  //               2.7265,
  //               3.1469,
  //               2.7265,
  //               3.2535,
  //               2.2188,
  //               3.2485
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 944,
  //                 "length": 8
  //               }
  //             ]
  //           },
  //           {
  //             "content": "1030109098",
  //             "polygon": [
  //               3.0159,
  //               3.1368,
  //               3.6303,
  //               3.1368,
  //               3.6303,
  //               3.2485,
  //               3.0159,
  //               3.2485
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 953,
  //                 "length": 10
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Terms of Payment : Pmt due within",
  //             "polygon": [
  //               4.4883,
  //               3.1368,
  //               6.1232,
  //               3.1368,
  //               6.1232,
  //               3.2637,
  //               4.4883,
  //               3.2637
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 964,
  //                 "length": 33
  //               }
  //             ]
  //           },
  //           {
  //             "content": "LARSEN & TOUBRO LIMITED",
  //             "polygon": [
  //               0.0914,
  //               3.2586,
  //               1.4013,
  //               3.2586,
  //               1.4013,
  //               3.3753,
  //               0.0914,
  //               3.3753
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 998,
  //                 "length": 23
  //               }
  //             ]
  //           },
  //           {
  //             "content": "LARSEN & TOUBRO LIMITED",
  //             "polygon": [
  //               2.2239,
  //               3.2637,
  //               3.5287,
  //               3.2637,
  //               3.5287,
  //               3.3753,
  //               2.2239,
  //               3.3753
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1022,
  //                 "length": 23
  //               }
  //             ]
  //           },
  //           {
  //             "content": "A b: 7, 8, 10, 11, LARSEN TOUBRO LI",
  //             "polygon": [
  //               0.1066,
  //               3.3906,
  //               1.772,
  //               3.3906,
  //               1.772,
  //               3.5124,
  //               0.1066,
  //               3.5124
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1046,
  //                 "length": 35
  //               }
  //             ]
  //           },
  //           {
  //             "content": "DEFENCE DIVISION, PLOT NO .: A5, A7, & A11",
  //             "polygon": [
  //               2.2594,
  //               3.3906,
  //               4.2903,
  //               3.3906,
  //               4.2903,
  //               3.5124,
  //               2.2594,
  //               3.5124
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1082,
  //                 "length": 42
  //               }
  //             ]
  //           },
  //           {
  //             "content": "60 days of invoice date",
  //             "polygon": [
  //               4.4883,
  //               3.2688,
  //               5.5596,
  //               3.2688,
  //               5.5596,
  //               3.3957,
  //               4.4883,
  //               3.3957
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1125,
  //                 "length": 23
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Terms Of Delivery: D02",
  //             "polygon": [
  //               4.4883,
  //               3.4007,
  //               5.5596,
  //               3.4007,
  //               5.5596,
  //               3.5276,
  //               4.4883,
  //               3.5225
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1149,
  //                 "length": 22
  //               }
  //             ]
  //           },
  //           {
  //             "content": "DEHENCI IC, MIDC, TALEGAON",
  //             "polygon": [
  //               0.0863,
  //               3.5327,
  //               1.5283,
  //               3.5276,
  //               1.5283,
  //               3.6444,
  //               0.0863,
  //               3.6494
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1172,
  //                 "length": 26
  //               }
  //             ]
  //           },
  //           {
  //             "content": "TALEGAON MIDC, VILLAGE NAVLAK",
  //             "polygon": [
  //               2.2289,
  //               3.5276,
  //               3.8943,
  //               3.5276,
  //               3.8943,
  //               3.6444,
  //               2.2289,
  //               3.6444
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1199,
  //                 "length": 29
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Due Date : 29.04.2024",
  //             "polygon": [
  //               4.4883,
  //               3.5327,
  //               5.5139,
  //               3.5327,
  //               5.5139,
  //               3.6596,
  //               4.4883,
  //               3.6596
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1229,
  //                 "length": 21
  //               }
  //             ]
  //           },
  //           {
  //             "content": "420 Uhr Received by",
  //             "polygon": [
  //               5.8592,
  //               3.4363,
  //               7.8698,
  //               3.0505,
  //               7.9003,
  //               3.2535,
  //               5.9049,
  //               3.69
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1251,
  //                 "length": 19
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Pone, Maharashtra, 410507",
  //             "polygon": [
  //               0.0812,
  //               3.6647,
  //               1.3658,
  //               3.6647,
  //               1.3658,
  //               3.7763,
  //               0.0812,
  //               3.7713
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1271,
  //                 "length": 25
  //               }
  //             ]
  //           },
  //           {
  //             "content": "UMBRE, TALUKA MAVAL, DISTRICT PUNE",
  //             "polygon": [
  //               2.2289,
  //               3.6596,
  //               4.1126,
  //               3.6545,
  //               4.1126,
  //               3.7763,
  //               2.2289,
  //               3.7814
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1297,
  //                 "length": 34
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Gross Weight:3157.920 KG",
  //             "polygon": [
  //               4.4832,
  //               3.6697,
  //               5.717,
  //               3.6697,
  //               5.7221,
  //               3.7916,
  //               4.4832,
  //               3.7966
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1332,
  //                 "length": 24
  //               }
  //             ]
  //           },
  //           {
  //             "content": "point shop2",
  //             "polygon": [
  //               6.0166,
  //               3.6139,
  //               7.1691,
  //               3.3753,
  //               7.2148,
  //               3.5632,
  //               6.0572,
  //               3.822
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1357,
  //                 "length": 11
  //               }
  //             ]
  //           },
  //           {
  //             "content": "TALL GAON 410507",
  //             "polygon": [
  //               0.1117,
  //               3.7916,
  //               1.0053,
  //               3.7966,
  //               1.0053,
  //               3.9134,
  //               0.1117,
  //               3.9134
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1369,
  //                 "length": 16
  //               }
  //             ]
  //           },
  //           {
  //             "content": "UMBRE 410507",
  //             "polygon": [
  //               2.234,
  //               3.7966,
  //               2.9499,
  //               3.8017,
  //               2.9499,
  //               3.9083,
  //               2.234,
  //               3.9083
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1386,
  //                 "length": 12
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Volume:2160 Kg/Lt/M",
  //             "polygon": [
  //               4.4426,
  //               3.7966,
  //               5.519,
  //               3.8017,
  //               5.519,
  //               3.9337,
  //               4.4426,
  //               3.9286
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1399,
  //                 "length": 19
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Đại No: 2114669215",
  //             "polygon": [
  //               0.1015,
  //               3.9337,
  //               1.051,
  //               3.9388,
  //               1.051,
  //               4.0453,
  //               0.1015,
  //               4.0453
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1419,
  //                 "length": 18
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Tel No: 7447413004",
  //             "polygon": [
  //               2.2289,
  //               3.9286,
  //               3.1581,
  //               3.9286,
  //               3.1581,
  //               4.0453,
  //               2.2289,
  //               4.0453
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1438,
  //                 "length": 18
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Net Weight:2909.520 KG CEIVED SIGN (Ny)",
  //             "polygon": [
  //               4.4883,
  //               3.8778,
  //               7.0727,
  //               3.5479,
  //               7.1031,
  //               3.8728,
  //               4.5137,
  //               4.0809
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1457,
  //                 "length": 39
  //               }
  //             ]
  //           },
  //           {
  //             "content": "protrom mohite",
  //             "polygon": [
  //               6.5091,
  //               3.9337,
  //               8.0627,
  //               3.4464,
  //               8.1237,
  //               3.7002,
  //               6.5802,
  //               4.1367
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1497,
  //                 "length": 14
  //               }
  //             ]
  //           },
  //           {
  //             "content": "PAN AAACI 0140P",
  //             "polygon": [
  //               0.0914,
  //               4.0656,
  //               0.9901,
  //               4.0656,
  //               0.9901,
  //               4.1824,
  //               0.0914,
  //               4.1824
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1512,
  //                 "length": 15
  //               }
  //             ]
  //           },
  //           {
  //             "content": "State Code : 27",
  //             "polygon": [
  //               2.2188,
  //               4.0656,
  //               2.9397,
  //               4.0606,
  //               2.9397,
  //               4.1824,
  //               2.2239,
  //               4.1824
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1528,
  //                 "length": 15
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Place of Supply : Maharashtra",
  //             "polygon": [
  //               0.0863,
  //               4.1976,
  //               1.4724,
  //               4.1976,
  //               1.4724,
  //               4.3296,
  //               0.0863,
  //               4.3245
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1544,
  //                 "length": 29
  //               }
  //             ]
  //           },
  //           {
  //             "content": "GSTIN/UniqueID :",
  //             "polygon": [
  //               2.2289,
  //               4.1976,
  //               3.0616,
  //               4.1976,
  //               3.0616,
  //               4.3296,
  //               2.2289,
  //               4.3245
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1574,
  //                 "length": 16
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Currency : INR/Indian Rupee",
  //             "polygon": [
  //               4.4883,
  //               4.0707,
  //               5.8135,
  //               4.0758,
  //               5.8135,
  //               4.2027,
  //               4.4883,
  //               4.1976
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1591,
  //                 "length": 27
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Storage Loc .: 1001",
  //             "polygon": [
  //               4.4832,
  //               4.2027,
  //               5.3464,
  //               4.2027,
  //               5.3464,
  //               4.3347,
  //               4.4832,
  //               4.3296
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1619,
  //                 "length": 19
  //               }
  //             ]
  //           },
  //           {
  //             "content": "PS NO.",
  //             "polygon": [
  //               5.4581,
  //               4.1875,
  //               5.9557,
  //               4.0656,
  //               5.9861,
  //               4.2281,
  //               5.4835,
  //               4.3347
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1639,
  //                 "length": 6
  //               }
  //             ]
  //           },
  //           {
  //             "content": "20319654",
  //             "polygon": [
  //               6.702,
  //               4.0961,
  //               7.687,
  //               3.8829,
  //               7.7327,
  //               4.0809,
  //               6.7477,
  //               4.2941
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1646,
  //                 "length": 8
  //               }
  //             ]
  //           },
  //           {
  //             "content": "GSTIN/Unique ID : 27AAACL0140PAZA",
  //             "polygon": [
  //               0.0965,
  //               4.3397,
  //               1.8938,
  //               4.3347,
  //               1.8938,
  //               4.4463,
  //               0.0965,
  //               4.4514
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1655,
  //                 "length": 33
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Site Contact Person:",
  //             "polygon": [
  //               2.2239,
  //               4.3347,
  //               3.1682,
  //               4.3397,
  //               3.1631,
  //               4.4514,
  //               2.2239,
  //               4.4514
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1689,
  //                 "length": 20
  //               }
  //             ]
  //           },
  //           {
  //             "content": "State Code 2/",
  //             "polygon": [
  //               0.0711,
  //               4.4768,
  //               0.8073,
  //               4.4768,
  //               0.8073,
  //               4.5884,
  //               0.0711,
  //               4.5884
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1710,
  //                 "length": 13
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Site Contact Person Ph: 2114669215",
  //             "polygon": [
  //               2.2188,
  //               4.4666,
  //               3.9095,
  //               4.4666,
  //               3.9095,
  //               4.5935,
  //               2.2188,
  //               4.5935
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1724,
  //                 "length": 34
  //               }
  //             ]
  //           },
  //           {
  //             "content": "LogSheet No:",
  //             "polygon": [
  //               4.4883,
  //               4.3397,
  //               5.1179,
  //               4.3397,
  //               5.1179,
  //               4.4717,
  //               4.4883,
  //               4.4666
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1759,
  //                 "length": 12
  //               }
  //             ]
  //           },
  //           {
  //             "content": "GC Note No:",
  //             "polygon": [
  //               4.4832,
  //               4.4768,
  //               5.0722,
  //               4.4819,
  //               5.0722,
  //               4.5986,
  //               4.4832,
  //               4.5935
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1772,
  //                 "length": 11
  //               }
  //             ]
  //           },
  //           {
  //             "content": "NAME",
  //             "polygon": [
  //               5.4936,
  //               4.3854,
  //               5.9303,
  //               4.2839,
  //               5.9607,
  //               4.4209,
  //               5.5241,
  //               4.5225
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1784,
  //                 "length": 4
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Destory Code : 00G5550011",
  //             "polygon": [
  //               0.1015,
  //               4.6087,
  //               1.4369,
  //               4.6087,
  //               1.4369,
  //               4.7255,
  //               0.1015,
  //               4.7255
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1789,
  //                 "length": 25
  //               }
  //             ]
  //           },
  //           {
  //             "content": "+Como93007",
  //             "polygon": [
  //               2.2137,
  //               4.6697,
  //               3.7318,
  //               4.6544,
  //               3.7369,
  //               4.9234,
  //               2.2137,
  //               4.9437
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1815,
  //                 "length": 10
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Vehicle No:",
  //             "polygon": [
  //               4.4832,
  //               4.6138,
  //               5.0113,
  //               4.6138,
  //               5.0113,
  //               4.7356,
  //               4.4832,
  //               4.7255
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1826,
  //                 "length": 11
  //               }
  //             ]
  //           },
  //           {
  //             "content": "PROJECT NO : DEBIT",
  //             "polygon": [
  //               5.5393,
  //               4.5631,
  //               7.1336,
  //               4.2027,
  //               7.1691,
  //               4.355,
  //               5.5749,
  //               4.7204
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1838,
  //                 "length": 18
  //               }
  //             ]
  //           },
  //           {
  //             "content": "SOEn 836",
  //             "polygon": [
  //               6.1994,
  //               4.5986,
  //               7.2047,
  //               4.36,
  //               7.2453,
  //               4.5377,
  //               6.2451,
  //               4.7813
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1857,
  //                 "length": 8
  //               }
  //             ]
  //           },
  //           {
  //             "content": "hieral Name I ARSEN & TOUBRO LIMITED",
  //             "polygon": [
  //               0.0812,
  //               4.7458,
  //               2.0208,
  //               4.7356,
  //               2.0208,
  //               4.8575,
  //               0.0812,
  //               4.8625
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1866,
  //                 "length": 36
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Mode of transport:",
  //             "polygon": [
  //               4.4832,
  //               4.7407,
  //               5.3565,
  //               4.7407,
  //               5.3515,
  //               4.8778,
  //               4.4832,
  //               4.8727
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1903,
  //                 "length": 18
  //               }
  //             ]
  //           },
  //           {
  //             "content": "CODE",
  //             "polygon": [
  //               5.585,
  //               4.7661,
  //               6.0318,
  //               4.6595,
  //               6.0623,
  //               4.8118,
  //               5.6155,
  //               4.9133
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1922,
  //                 "length": 4
  //               }
  //             ]
  //           },
  //           {
  //             "content": "2/3/2024",
  //             "polygon": [
  //               6.1994,
  //               4.8219,
  //               7.0422,
  //               4.6037,
  //               7.093,
  //               4.7762,
  //               6.2349,
  //               5.0097
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1927,
  //                 "length": 8
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Material",
  //             "polygon": [
  //               0.0863,
  //               5.025,
  //               0.523,
  //               5.03,
  //               0.523,
  //               5.1417,
  //               0.0863,
  //               5.1366
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1936,
  //                 "length": 8
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Description",
  //             "polygon": [
  //               1.0256,
  //               5.0909,
  //               1.6146,
  //               5.096,
  //               1.6146,
  //               5.2178,
  //               1.0256,
  //               5.2128
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1945,
  //                 "length": 11
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Qty",
  //             "polygon": [
  //               2.2949,
  //               5.1011,
  //               2.4929,
  //               5.1011,
  //               2.4879,
  //               5.2178,
  //               2.2949,
  //               5.2077
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1957,
  //                 "length": 3
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Packs",
  //             "polygon": [
  //               2.691,
  //               5.096,
  //               3.0007,
  //               5.1011,
  //               2.9956,
  //               5.2077,
  //               2.691,
  //               5.1975
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1961,
  //                 "length": 5
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Volume",
  //             "polygon": [
  //               3.087,
  //               5.03,
  //               3.4881,
  //               5.03,
  //               3.483,
  //               5.1366,
  //               3.087,
  //               5.1315
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1967,
  //                 "length": 6
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Rate",
  //             "polygon": [
  //               3.6658,
  //               5.025,
  //               3.9095,
  //               5.025,
  //               3.9095,
  //               5.1366,
  //               3.6709,
  //               5.1315
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1974,
  //                 "length": 4
  //               }
  //             ]
  //           },
  //           {
  //             "content": "DATE",
  //             "polygon": [
  //               5.6206,
  //               4.9437,
  //               6.0064,
  //               4.8625,
  //               6.042,
  //               5.0402,
  //               5.6459,
  //               5.1315
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1979,
  //                 "length": 4
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Value",
  //             "polygon": [
  //               4.2294,
  //               5.0909,
  //               4.534,
  //               5.0909,
  //               4.534,
  //               5.1975,
  //               4.2294,
  //               5.1975
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1984,
  //                 "length": 5
  //               }
  //             ]
  //           },
  //           {
  //             "content": "In-Bill",
  //             "polygon": [
  //               4.8133,
  //               5.025,
  //               5.1179,
  //               5.025,
  //               5.1179,
  //               5.1315,
  //               4.8133,
  //               5.1315
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1990,
  //                 "length": 7
  //               }
  //             ]
  //           },
  //           {
  //             "content": "In-Bill",
  //             "polygon": [
  //               5.2601,
  //               5.0097,
  //               5.6256,
  //               5.0097,
  //               5.6256,
  //               5.1366,
  //               5.2601,
  //               5.1366
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 1998,
  //                 "length": 7
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Cash",
  //             "polygon": [
  //               5.6815,
  //               5.0148,
  //               5.9963,
  //               5.025,
  //               5.9963,
  //               5.1315,
  //               5.6815,
  //               5.1265
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2006,
  //                 "length": 4
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Taxable",
  //             "polygon": [
  //               6.2298,
  //               5.025,
  //               6.6411,
  //               5.025,
  //               6.6411,
  //               5.1366,
  //               6.2298,
  //               5.1366
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2011,
  //                 "length": 7
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Tax",
  //             "polygon": [
  //               6.8645,
  //               5.03,
  //               7.0625,
  //               5.03,
  //               7.0676,
  //               5.1265,
  //               6.8645,
  //               5.1214
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2019,
  //                 "length": 3
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Total",
  //             "polygon": [
  //               7.423,
  //               5.025,
  //               7.6921,
  //               5.025,
  //               7.687,
  //               5.1315,
  //               7.423,
  //               5.1265
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2023,
  //                 "length": 5
  //               }
  //             ]
  //           },
  //           {
  //             "content": "HSN",
  //             "polygon": [
  //               0.0762,
  //               5.1671,
  //               0.3199,
  //               5.162,
  //               0.3199,
  //               5.2686,
  //               0.0762,
  //               5.2686
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2029,
  //                 "length": 3
  //               }
  //             ]
  //           },
  //           {
  //             "content": "(Lt/Kg)",
  //             "polygon": [
  //               3.0819,
  //               5.162,
  //               3.4322,
  //               5.162,
  //               3.4322,
  //               5.2889,
  //               3.0921,
  //               5.2838
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2033,
  //                 "length": 7
  //               }
  //             ]
  //           },
  //           {
  //             "content": "(INR/ %)",
  //             "polygon": [
  //               3.6709,
  //               5.1569,
  //               4.0872,
  //               5.1569,
  //               4.0821,
  //               5.2838,
  //               3.6709,
  //               5.2787
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2041,
  //                 "length": 8
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Disc.",
  //             "polygon": [
  //               4.8183,
  //               5.162,
  //               5.0621,
  //               5.162,
  //               5.0621,
  //               5.2686,
  //               4.8183,
  //               5.2635
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2050,
  //                 "length": 5
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Disc. 2",
  //             "polygon": [
  //               5.255,
  //               5.162,
  //               5.6002,
  //               5.162,
  //               5.6002,
  //               5.2686,
  //               5.255,
  //               5.2635
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2056,
  //                 "length": 7
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Disc.",
  //             "polygon": [
  //               5.7424,
  //               5.162,
  //               5.9912,
  //               5.1671,
  //               5.9912,
  //               5.2635,
  //               5.7475,
  //               5.2584
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2064,
  //                 "length": 5
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Amount",
  //             "polygon": [
  //               6.2197,
  //               5.162,
  //               6.6563,
  //               5.1569,
  //               6.6563,
  //               5.2686,
  //               6.2197,
  //               5.2686
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2070,
  //                 "length": 6
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Amount",
  //             "polygon": [
  //               6.8645,
  //               5.1671,
  //               7.2859,
  //               5.162,
  //               7.2859,
  //               5.2686,
  //               6.8645,
  //               5.2686
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2077,
  //                 "length": 6
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Amount",
  //             "polygon": [
  //               7.4179,
  //               5.162,
  //               7.8393,
  //               5.162,
  //               7.8343,
  //               5.2686,
  //               7.4179,
  //               5.2686
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2084,
  //                 "length": 6
  //               }
  //             ]
  //           },
  //           {
  //             "content": "3430229320",
  //             "polygon": [
  //               0.0457,
  //               5.3447,
  //               0.7362,
  //               5.3498,
  //               0.7362,
  //               5.4716,
  //               0.0457,
  //               5.4665
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2091,
  //                 "length": 10
  //               }
  //             ]
  //           },
  //           {
  //             "content": "APTHANHBPUFIN",
  //             "polygon": [
  //               1.0205,
  //               5.4158,
  //               1.8583,
  //               5.4158,
  //               1.8532,
  //               5.5325,
  //               1.0205,
  //               5.5275
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2102,
  //                 "length": 13
  //               }
  //             ]
  //           },
  //           {
  //             "content": "108",
  //             "polygon": [
  //               2.4523,
  //               5.3549,
  //               2.63,
  //               5.3549,
  //               2.6351,
  //               5.4564,
  //               2.4523,
  //               5.4564
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2116,
  //                 "length": 3
  //               }
  //             ]
  //           },
  //           {
  //             "content": "108",
  //             "polygon": [
  //               2.8382,
  //               5.3549,
  //               3.0108,
  //               5.3549,
  //               3.0108,
  //               5.4564,
  //               2.8433,
  //               5.4564
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2120,
  //                 "length": 3
  //               }
  //             ]
  //           },
  //           {
  //             "content": "2160.000",
  //             "polygon": [
  //               3.1631,
  //               5.3447,
  //               3.6049,
  //               5.3447,
  //               3.6049,
  //               5.4615,
  //               3.1631,
  //               5.4615
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2124,
  //                 "length": 8
  //               }
  //             ]
  //           },
  //           {
  //             "content": "5600.00",
  //             "polygon": [
  //               3.7877,
  //               5.3447,
  //               4.1786,
  //               5.3397,
  //               4.1786,
  //               5.4615,
  //               3.7927,
  //               5.4665
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2133,
  //                 "length": 7
  //               }
  //             ]
  //           },
  //           {
  //             "content": "604800.00",
  //             "polygon": [
  //               4.2548,
  //               5.3397,
  //               4.7523,
  //               5.3397,
  //               4.7523,
  //               5.4615,
  //               4.2548,
  //               5.4615
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2141,
  //                 "length": 9
  //               }
  //             ]
  //           },
  //           {
  //             "content": "604800.00",
  //             "polygon": [
  //               6.306,
  //               5.3447,
  //               6.7985,
  //               5.3447,
  //               6.7985,
  //               5.4615,
  //               6.306,
  //               5.4564
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2151,
  //                 "length": 9
  //               }
  //             ]
  //           },
  //           {
  //             "content": "713664.00",
  //             "polygon": [
  //               7.5347,
  //               5.3447,
  //               8.0221,
  //               5.3447,
  //               8.0221,
  //               5.4615,
  //               7.5347,
  //               5.4615
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2161,
  //                 "length": 9
  //               }
  //             ]
  //           },
  //           {
  //             "content": "OLIVEGRN 20LT",
  //             "polygon": [
  //               1.0205,
  //               5.5478,
  //               1.7669,
  //               5.5478,
  //               1.7669,
  //               5.6645,
  //               1.0205,
  //               5.6645
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2171,
  //                 "length": 13
  //               }
  //             ]
  //           },
  //           {
  //             "content": "DR",
  //             "polygon": [
  //               2.8737,
  //               5.4868,
  //               3.021,
  //               5.4868,
  //               3.021,
  //               5.5884,
  //               2.8737,
  //               5.5833
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2185,
  //                 "length": 2
  //               }
  //             ]
  //           },
  //           {
  //             "content": "=",
  //             "polygon": [
  //               3.1581,
  //               5.4818,
  //               3.4272,
  //               5.4818,
  //               3.4322,
  //               5.6087,
  //               3.153,
  //               5.629
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2188,
  //                 "length": 1
  //               }
  //             ]
  //           },
  //           {
  //             "content": "MSN. 320890",
  //             "polygon": [
  //               0.0457,
  //               5.6188,
  //               0.7311,
  //               5.6188,
  //               0.7311,
  //               5.7356,
  //               0.0457,
  //               5.7356
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2190,
  //                 "length": 11
  //               }
  //             ]
  //           },
  //           {
  //             "content": "IN: Central GST OP",
  //             "polygon": [
  //               1.0256,
  //               5.6848,
  //               1.8837,
  //               5.6848,
  //               1.8837,
  //               5.7965,
  //               1.0256,
  //               5.7965
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2202,
  //                 "length": 18
  //               }
  //             ]
  //           },
  //           {
  //             "content": "9.00",
  //             "polygon": [
  //               3.9552,
  //               5.6188,
  //               4.1685,
  //               5.6137,
  //               4.1735,
  //               5.7203,
  //               3.9603,
  //               5.7203
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2221,
  //                 "length": 4
  //               }
  //             ]
  //           },
  //           {
  //             "content": "IN: State GST OP",
  //             "polygon": [
  //               1.0104,
  //               5.8218,
  //               1.7923,
  //               5.8168,
  //               1.7923,
  //               5.9284,
  //               1.0104,
  //               5.9284
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2226,
  //                 "length": 16
  //               }
  //             ]
  //           },
  //           {
  //             "content": "9.00",
  //             "polygon": [
  //               3.9603,
  //               5.7559,
  //               4.1735,
  //               5.7457,
  //               4.1735,
  //               5.8574,
  //               3.9704,
  //               5.8574
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2243,
  //                 "length": 4
  //               }
  //             ]
  //           },
  //           {
  //             "content": "54432.00",
  //             "polygon": [
  //               6.9203,
  //               5.7457,
  //               7.3621,
  //               5.7457,
  //               7.3621,
  //               5.8624,
  //               6.9203,
  //               5.8624
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2248,
  //                 "length": 8
  //               }
  //             ]
  //           },
  //           {
  //             "content": "54432.00",
  //             "polygon": [
  //               6.9254,
  //               5.8777,
  //               7.3671,
  //               5.8777,
  //               7.3671,
  //               5.9893,
  //               6.9254,
  //               5.9893
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2257,
  //                 "length": 8
  //               }
  //             ]
  //           },
  //           {
  //             "content": "604800.00",
  //             "polygon": [
  //               4.2548,
  //               6.0706,
  //               4.7574,
  //               6.0655,
  //               4.7574,
  //               6.1822,
  //               4.2548,
  //               6.1822
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2266,
  //                 "length": 9
  //               }
  //             ]
  //           },
  //           {
  //             "content": "0.00",
  //             "polygon": [
  //               4.9859,
  //               6.0756,
  //               5.1991,
  //               6.0706,
  //               5.1991,
  //               6.1771,
  //               4.991,
  //               6.1771
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2276,
  //                 "length": 4
  //               }
  //             ]
  //           },
  //           {
  //             "content": "0.00",
  //             "polygon": [
  //               5.4682,
  //               6.0706,
  //               5.6815,
  //               6.0706,
  //               5.6815,
  //               6.1771,
  //               5.4682,
  //               6.1771
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2281,
  //                 "length": 4
  //               }
  //             ]
  //           },
  //           {
  //             "content": "0.00",
  //             "polygon": [
  //               5.9506,
  //               6.0756,
  //               6.1638,
  //               6.0706,
  //               6.1638,
  //               6.1822,
  //               5.9557,
  //               6.1771
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2286,
  //                 "length": 4
  //               }
  //             ]
  //           },
  //           {
  //             "content": "604800.00",
  //             "polygon": [
  //               6.306,
  //               6.0655,
  //               6.8289,
  //               6.0655,
  //               6.8289,
  //               6.1771,
  //               6.306,
  //               6.1822
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2291,
  //                 "length": 9
  //               }
  //             ]
  //           },
  //           {
  //             "content": "108864.00",
  //             "polygon": [
  //               6.8289,
  //               6.0655,
  //               7.3519,
  //               6.0706,
  //               7.3519,
  //               6.1873,
  //               6.8289,
  //               6.1822
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2301,
  //                 "length": 9
  //               }
  //             ]
  //           },
  //           {
  //             "content": "713664.00",
  //             "polygon": [
  //               7.5296,
  //               6.0604,
  //               8.0323,
  //               6.0604,
  //               8.0272,
  //               6.1822,
  //               7.5296,
  //               6.1822
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2311,
  //                 "length": 9
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Summary",
  //             "polygon": [
  //               3.0159,
  //               6.2888,
  //               3.5033,
  //               6.2888,
  //               3.5033,
  //               6.4106,
  //               3.0159,
  //               6.4005
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2321,
  //                 "length": 7
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Taxable Amount",
  //             "polygon": [
  //               4.2649,
  //               6.2685,
  //               5.1027,
  //               6.2787,
  //               5.1027,
  //               6.3954,
  //               4.2649,
  //               6.3903
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2329,
  //                 "length": 14
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Total Amount",
  //             "polygon": [
  //               5.3058,
  //               6.2787,
  //               6.0217,
  //               6.2787,
  //               6.0217,
  //               6.3903,
  //               5.3058,
  //               6.3852
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2344,
  //                 "length": 12
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Taxable Amount",
  //             "polygon": [
  //               2.3203,
  //               6.4817,
  //               3.087,
  //               6.4817,
  //               3.087,
  //               6.5984,
  //               2.3203,
  //               6.5984
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2357,
  //                 "length": 14
  //               }
  //             ]
  //           },
  //           {
  //             "content": "604800.00",
  //             "polygon": [
  //               5.6713,
  //               6.4766,
  //               6.1638,
  //               6.4766,
  //               6.1638,
  //               6.5934,
  //               5.6713,
  //               6.5883
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2372,
  //                 "length": 9
  //               }
  //             ]
  //           },
  //           {
  //             "content": "IN : Central GST- OP 9 %",
  //             "polygon": [
  //               2.3102,
  //               6.6796,
  //               3.417,
  //               6.6796,
  //               3.417,
  //               6.7964,
  //               2.3102,
  //               6.7964
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2382,
  //                 "length": 24
  //               }
  //             ]
  //           },
  //           {
  //             "content": "604800.00",
  //             "polygon": [
  //               4.6,
  //               6.6796,
  //               5.1027,
  //               6.6796,
  //               5.1027,
  //               6.7913,
  //               4.6,
  //               6.7862
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2407,
  //                 "length": 9
  //               }
  //             ]
  //           },
  //           {
  //             "content": "54432.00",
  //             "polygon": [
  //               5.7272,
  //               6.6695,
  //               6.1638,
  //               6.6695,
  //               6.1638,
  //               6.7964,
  //               5.7272,
  //               6.7913
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2417,
  //                 "length": 8
  //               }
  //             ]
  //           },
  //           {
  //             "content": "IN : State GST- OP 9 %",
  //             "polygon": [
  //               2.3051,
  //               6.8776,
  //               3.3358,
  //               6.8776,
  //               3.3358,
  //               6.9994,
  //               2.3051,
  //               6.9994
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2426,
  //                 "length": 22
  //               }
  //             ]
  //           },
  //           {
  //             "content": "604800.00",
  //             "polygon": [
  //               4.6051,
  //               6.8776,
  //               5.1027,
  //               6.8776,
  //               5.1027,
  //               6.9893,
  //               4.6051,
  //               6.9893
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2449,
  //                 "length": 9
  //               }
  //             ]
  //           },
  //           {
  //             "content": "54432.00",
  //             "polygon": [
  //               5.7272,
  //               6.8725,
  //               6.1689,
  //               6.8725,
  //               6.1689,
  //               6.9943,
  //               5.7272,
  //               6.9893
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2459,
  //                 "length": 8
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Total Amt. before rounding",
  //             "polygon": [
  //               2.3102,
  //               7.0806,
  //               3.5846,
  //               7.0806,
  //               3.5846,
  //               7.2177,
  //               2.3102,
  //               7.2075
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2468,
  //                 "length": 26
  //               }
  //             ]
  //           },
  //           {
  //             "content": "713664.00",
  //             "polygon": [
  //               5.6713,
  //               7.0705,
  //               6.1638,
  //               7.0705,
  //               6.1638,
  //               7.1923,
  //               5.6713,
  //               7.1872
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2495,
  //                 "length": 9
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Total Invoice Value ( In Words ) :",
  //             "polygon": [
  //               0.0914,
  //               7.4105,
  //               1.6806,
  //               7.4055,
  //               1.6806,
  //               7.5425,
  //               0.0914,
  //               7.5425
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2505,
  //                 "length": 34
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Seven Lakh Thirteen Thousand Six Hundred Sixty Four Rupees Only",
  //             "polygon": [
  //               2.0918,
  //               7.4004,
  //               5.2296,
  //               7.4004,
  //               5.2296,
  //               7.5324,
  //               2.0918,
  //               7.5374
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2540,
  //                 "length": 63
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Bochan tre Identification Number (CIN): U24110MH2011PTC220557",
  //             "polygon": [
  //               0.0559,
  //               7.9029,
  //               2.8027,
  //               7.8877,
  //               2.8027,
  //               7.9993,
  //               0.0559,
  //               8.0146
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2604,
  //                 "length": 61
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Customer",
  //             "polygon": [
  //               3.4627,
  //               7.8927,
  //               4.0111,
  //               7.8927,
  //               4.0111,
  //               8.0146,
  //               3.4627,
  //               8.0146
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2666,
  //                 "length": 8
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Package Summary",
  //             "polygon": [
  //               5.2296,
  //               7.8775,
  //               6.2857,
  //               7.8826,
  //               6.2857,
  //               8.0247,
  //               5.2296,
  //               8.0196
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2675,
  //                 "length": 15
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Authorized Signatory",
  //             "polygon": [
  //               6.6309,
  //               7.8877,
  //               7.7682,
  //               7.8927,
  //               7.7682,
  //               8.0247,
  //               6.6309,
  //               8.0196
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2691,
  //                 "length": 20
  //               }
  //             ]
  //           },
  //           {
  //             "content": "til Feedback/complaints, email to: customercare.apppg@asianpaintsppg.com",
  //             "polygon": [
  //               0.0609,
  //               8.0146,
  //               3.2799,
  //               8.0095,
  //               3.2799,
  //               8.1262,
  //               0.0609,
  //               8.1313
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2712,
  //                 "length": 72
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Hardner",
  //             "polygon": [
  //               5.2296,
  //               8.0247,
  //               5.6256,
  //               8.0247,
  //               5.6256,
  //               8.1465,
  //               5.2296,
  //               8.1414
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2785,
  //                 "length": 7
  //               }
  //             ]
  //           },
  //           {
  //             "content": "111",
  //             "polygon": [
  //               5.9049,
  //               8.0298,
  //               6.0826,
  //               8.0298,
  //               6.0826,
  //               8.1364,
  //               5.9049,
  //               8.1313
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2793,
  //                 "length": 3
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Ke Bonne Office : Plot no. 5, Gaiwadi Industrial Estate,",
  //             "polygon": [
  //               0.0965,
  //               8.1364,
  //               2.2695,
  //               8.1262,
  //               2.2695,
  //               8.2379,
  //               0.0965,
  //               8.2531
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2797,
  //                 "length": 56
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Acknowledgement",
  //             "polygon": [
  //               3.4526,
  //               8.0349,
  //               4.5289,
  //               8.0399,
  //               4.5289,
  //               8.177,
  //               3.4526,
  //               8.1719
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2854,
  //                 "length": 15
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Digitally signed by SAGAR",
  //             "polygon": [
  //               7.1894,
  //               8.0907,
  //               7.9003,
  //               8.0856,
  //               7.9053,
  //               8.1668,
  //               7.1894,
  //               8.1719
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2870,
  //                 "length": 25
  //               }
  //             ]
  //           },
  //           {
  //             "content": "3 V Road, Goregaon (west), Mumbai 400 062 Ph.No. 022 62182700",
  //             "polygon": [
  //               0.0559,
  //               8.248,
  //               2.762,
  //               8.2379,
  //               2.762,
  //               8.3495,
  //               0.0559,
  //               8.3648
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2896,
  //                 "length": 61
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Receipt Date",
  //             "polygon": [
  //               3.4576,
  //               8.2633,
  //               4.1786,
  //               8.2633,
  //               4.1786,
  //               8.4003,
  //               3.4576,
  //               8.3952
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2958,
  //                 "length": 12
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Base",
  //             "polygon": [
  //               5.2245,
  //               8.2074,
  //               5.4581,
  //               8.2074,
  //               5.4632,
  //               8.3242,
  //               5.2296,
  //               8.3191
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2971,
  //                 "length": 4
  //               }
  //             ]
  //           },
  //           {
  //             "content": "111",
  //             "polygon": [
  //               5.8947,
  //               8.2024,
  //               6.0826,
  //               8.2074,
  //               6.0826,
  //               8.3191,
  //               5.8998,
  //               8.314
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2976,
  //                 "length": 3
  //               }
  //             ]
  //           },
  //           {
  //             "content": "SAGAR",
  //             "polygon": [
  //               6.3669,
  //               8.1059,
  //               7.098,
  //               8.1059,
  //               7.098,
  //               8.3089,
  //               6.3669,
  //               8.3039
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2980,
  //                 "length": 5
  //               }
  //             ]
  //           },
  //           {
  //             "content": "SHRIKRISHNA KHADE",
  //             "polygon": [
  //               7.1945,
  //               8.1668,
  //               7.7733,
  //               8.1668,
  //               7.7733,
  //               8.2379,
  //               7.1945,
  //               8.243
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 2986,
  //                 "length": 17
  //               }
  //             ]
  //           },
  //           {
  //             "content": "DN: cn=SAGAR SHRIKRISHNA",
  //             "polygon": [
  //               7.1945,
  //               8.243,
  //               7.9916,
  //               8.243,
  //               7.9916,
  //               8.3191,
  //               7.1945,
  //               8.3191
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 3004,
  //                 "length": 24
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Fre eripayment of this bill is not received within due date interest at 18% will be",
  //             "polygon": [
  //               0.0203,
  //               8.4764,
  //               3.3662,
  //               8.4663,
  //               3.3662,
  //               8.583,
  //               0.0203,
  //               8.5983
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 3029,
  //                 "length": 83
  //               }
  //             ]
  //           },
  //           {
  //             "content": "SHRIKRI",
  //             "polygon": [
  //               6.372,
  //               8.3952,
  //               7.1742,
  //               8.3952,
  //               7.1742,
  //               8.6033,
  //               6.372,
  //               8.6033
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 3113,
  //                 "length": 7
  //               }
  //             ]
  //           },
  //           {
  //             "content": "KHADE, c=IN, st-Maharashtra,",
  //             "polygon": [
  //               7.2047,
  //               8.3242,
  //               8.012,
  //               8.3242,
  //               8.012,
  //               8.4003,
  //               7.2047,
  //               8.3952
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 3121,
  //                 "length": 28
  //               }
  //             ]
  //           },
  //           {
  //             "content": "O ASIAN PAINTS PPG PRIVATE",
  //             "polygon": [
  //               7.1793,
  //               8.4054,
  //               8.0018,
  //               8.3952,
  //               8.0069,
  //               8.4714,
  //               7.1793,
  //               8.4815
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 3150,
  //                 "length": 26
  //               }
  //             ]
  //           },
  //           {
  //             "content": "LIMITED, ou-MANAGEMENT,",
  //             "polygon": [
  //               7.1793,
  //               8.4663,
  //               7.9916,
  //               8.4663,
  //               7.9916,
  //               8.5577,
  //               7.1793,
  //               8.5577
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 3177,
  //                 "length": 23
  //               }
  //             ]
  //           },
  //           {
  //             "content": "serialNumbers",
  //             "polygon": [
  //               7.2047,
  //               8.5577,
  //               7.6159,
  //               8.5577,
  //               7.6159,
  //               8.6236,
  //               7.2047,
  //               8.6236
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 3201,
  //                 "length": 13
  //               }
  //             ]
  //           },
  //           {
  //             "content": "F087D64B9EDD6CC05130A98",
  //             "polygon": [
  //               7.2047,
  //               8.6287,
  //               8.012,
  //               8.6287,
  //               8.012,
  //               8.7048,
  //               7.2047,
  //               8.6998
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 3215,
  //                 "length": 23
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Any et ference or dispute arising under this document/contract shall be subject to",
  //             "polygon": [
  //               0.066,
  //               8.7201,
  //               3.4119,
  //               8.7048,
  //               3.4119,
  //               8.8216,
  //               0.066,
  //               8.8368
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 3239,
  //                 "length": 82
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Receipt Time",
  //             "polygon": [
  //               3.4576,
  //               8.6338,
  //               4.1938,
  //               8.6338,
  //               4.1938,
  //               8.7759,
  //               3.4576,
  //               8.7759
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 3322,
  //                 "length": 12
  //               }
  //             ]
  //           },
  //           {
  //             "content": "SHNA",
  //             "polygon": [
  //               6.3618,
  //               8.7048,
  //               6.9762,
  //               8.7048,
  //               6.9762,
  //               8.9028,
  //               6.3618,
  //               8.8977
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 3335,
  //                 "length": 4
  //               }
  //             ]
  //           },
  //           {
  //             "content": "3170F11DE01B5DA6349201E",
  //             "polygon": [
  //               7.1945,
  //               8.7048,
  //               7.9916,
  //               8.7048,
  //               7.9916,
  //               8.781,
  //               7.1945,
  //               8.781
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 3340,
  //                 "length": 23
  //               }
  //             ]
  //           },
  //           {
  //             "content": "exasive jusrisdiction of the courts in Mumbai",
  //             "polygon": [
  //               0.0609,
  //               8.8368,
  //               1.97,
  //               8.8317,
  //               1.97,
  //               8.9383,
  //               0.0609,
  //               8.9485
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 3364,
  //                 "length": 45
  //               }
  //             ]
  //           },
  //           {
  //             "content": "EBC2CD62B8833D96D5",
  //             "polygon": [
  //               7.2047,
  //               8.7861,
  //               7.8495,
  //               8.7861,
  //               7.8495,
  //               8.8571,
  //               7.2047,
  //               8.8571
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 3410,
  //                 "length": 18
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Reason: I attest to the",
  //             "polygon": [
  //               7.1996,
  //               8.8622,
  //               7.7987,
  //               8.8673,
  //               7.7987,
  //               8.9383,
  //               7.1996,
  //               8.9333
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 3429,
  //                 "length": 23
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Customer Sign &",
  //             "polygon": [
  //               3.4526,
  //               8.9942,
  //               4.3817,
  //               8.9891,
  //               4.3868,
  //               9.1617,
  //               3.4526,
  //               9.1718
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 3453,
  //                 "length": 15
  //               }
  //             ]
  //           },
  //           {
  //             "content": "KHADE",
  //             "polygon": [
  //               6.3669,
  //               8.9992,
  //               7.1082,
  //               8.9992,
  //               7.1082,
  //               9.1972,
  //               6.3669,
  //               9.1972
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 3469,
  //                 "length": 5
  //               }
  //             ]
  //           },
  //           {
  //             "content": "accuracy and integrity of this",
  //             "polygon": [
  //               7.1996,
  //               8.9434,
  //               7.9866,
  //               8.9383,
  //               7.9866,
  //               9.0145,
  //               7.1996,
  //               9.0195
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 3475,
  //                 "length": 30
  //               }
  //             ]
  //           },
  //           {
  //             "content": "document",
  //             "polygon": [
  //               7.1945,
  //               9.0195,
  //               7.4941,
  //               9.0195,
  //               7.4941,
  //               9.0906,
  //               7.1945,
  //               9.0906
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 3506,
  //                 "length": 8
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Stamp",
  //             "polygon": [
  //               3.4475,
  //               9.1667,
  //               3.8283,
  //               9.1718,
  //               3.8283,
  //               9.3038,
  //               3.4526,
  //               9.2936
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 3515,
  //                 "length": 5
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Date: 2024.02.29 23:15:05",
  //             "polygon": [
  //               7.1945,
  //               9.0906,
  //               7.8901,
  //               9.0906,
  //               7.8901,
  //               9.1667,
  //               7.1945,
  //               9.1667
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 3521,
  //                 "length": 25
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Total Packs: 222",
  //             "polygon": [
  //               5.2194,
  //               9.2124,
  //               6.0115,
  //               9.2124,
  //               6.0115,
  //               9.3393,
  //               5.2245,
  //               9.3444
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 3547,
  //                 "length": 16
  //               }
  //             ]
  //           },
  //           {
  //             "content": "+05'30",
  //             "polygon": [
  //               7.1996,
  //               9.1718,
  //               7.4027,
  //               9.1718,
  //               7.4027,
  //               9.248,
  //               7.1996,
  //               9.2429
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 3564,
  //                 "length": 6
  //               }
  //             ]
  //           },
  //           {
  //             "content": "DECLARATION",
  //             "polygon": [
  //               3.7115,
  //               9.4053,
  //               4.4325,
  //               9.4002,
  //               4.4325,
  //               9.517,
  //               3.7115,
  //               9.517
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 3571,
  //                 "length": 11
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Brent ie sub ect to our standard terms and conditions as per our dealer price list.",
  //             "polygon": [
  //               0.1676,
  //               9.8063,
  //               3.0311,
  //               9.7961,
  //               3.0311,
  //               9.8976,
  //               0.1676,
  //               9.9129
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 3583,
  //                 "length": 83
  //               }
  //             ]
  //           },
  //           {
  //             "content": "på vand except on our official form.We have enabled additional electronic mode of accepting payment at onlinepayment.asianpaintsppg.com",
  //             "polygon": [
  //               0.3859,
  //               9.9027,
  //               5.387,
  //               9.8926,
  //               5.387,
  //               9.9992,
  //               0.3859,
  //               10.0144
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 3667,
  //                 "length": 135
  //               }
  //             ]
  //           },
  //           {
  //             "content": "MR/BA CH NO and date of manufacture appearing on the package and cite the same in case of a complaint.",
  //             "polygon": [
  //               0.2183,
  //               10.0093,
  //               4.2395,
  //               9.9941,
  //               4.2395,
  //               10.1007,
  //               0.2183,
  //               10.1159
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 3803,
  //                 "length": 102
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Pendientee are ox Depot, with Freight being prepaid by the Company for delivery at the Destination ...",
  //             "polygon": [
  //               0.2132,
  //               10.1108,
  //               3.8994,
  //               10.0956,
  //               3.8994,
  //               10.2073,
  //               0.2132,
  //               10.2225
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 3906,
  //                 "length": 102
  //               }
  //             ]
  //           },
  //           {
  //             "content": "no way it is discretion, may compensate for Leakages and Breakages that occur in transit after evaluation of the chain die Frage & Shortages that occur at Dealer Shop or Site will be to Dealer / Purchaser's A/",
  //             "polygon": [
  //               0.2234,
  //               10.2123,
  //               8.0221,
  //               10.1717,
  //               8.0221,
  //               10.3037,
  //               0.2234,
  //               10.3291
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 4009,
  //                 "length": 209
  //               }
  //             ]
  //           },
  //           {
  //             "content": "1- Hhín Đồ Sức along with Hardeners",
  //             "polygon": [
  //               0.1117,
  //               10.3951,
  //               1.508,
  //               10.4001,
  //               1.508,
  //               10.527,
  //               0.1117,
  //               10.522
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 4219,
  //                 "length": 35
  //               }
  //             ]
  //           },
  //           {
  //             "content": "MATT",
  //             "polygon": [
  //               2.9296,
  //               10.4103,
  //               3.3256,
  //               10.4154,
  //               3.3307,
  //               10.5575,
  //               2.9347,
  //               10.5727
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 4255,
  //                 "length": 4
  //               }
  //             ]
  //           },
  //           {
  //             "content": "5. DIC-SSC TALEGAOR",
  //             "polygon": [
  //               3.8334,
  //               10.3951,
  //               5.189,
  //               10.3646,
  //               5.1941,
  //               10.5423,
  //               3.8334,
  //               10.5727
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 4260,
  //                 "length": 19
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Total Amount includes Commercial Rounding as applicable",
  //             "polygon": [
  //               0.066,
  //               10.6692,
  //               2.6402,
  //               10.6641,
  //               2.6402,
  //               10.7859,
  //               0.066,
  //               10.796
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 4280,
  //                 "length": 55
  //               }
  //             ]
  //           },
  //           {
  //             "content": "TAPPSTAL",
  //             "polygon": [
  //               4.1177,
  //               10.593,
  //               4.7168,
  //               10.593,
  //               4.7168,
  //               10.7453,
  //               4.1177,
  //               10.7453
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 4336,
  //                 "length": 8
  //               }
  //             ]
  //           },
  //           {
  //             "content": "15859",
  //             "polygon": [
  //               3.9146,
  //               10.7707,
  //               4.7828,
  //               10.7554,
  //               4.7879,
  //               10.9534,
  //               3.9197,
  //               10.9737
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 4345,
  //                 "length": 5
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Page 1 of 1",
  //             "polygon": [
  //               6.9406,
  //               10.6742,
  //               7.6616,
  //               10.6742,
  //               7.6616,
  //               10.8366,
  //               6.9457,
  //               10.8366
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 4351,
  //                 "length": 11
  //               }
  //             ]
  //           },
  //           {
  //             "content": "TIMAI 9'30 DATE: 02/3/24",
  //             "polygon": [
  //               2.9651,
  //               11.0041,
  //               5.0874,
  //               10.9432,
  //               5.0925,
  //               11.1361,
  //               2.9702,
  //               11.1767
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 4363,
  //                 "length": 24
  //               }
  //             ]
  //           },
  //           {
  //             "content": "Sec. Supir ame",
  //             "polygon": [
  //               2.9448,
  //               11.2275,
  //               3.5947,
  //               11.2275,
  //               3.5947,
  //               11.3594,
  //               2.9448,
  //               11.3594
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 4388,
  //                 "length": 14
  //               }
  //             ]
  //           },
  //           {
  //             "content": "p",
  //             "polygon": [
  //               4.0669,
  //               11.2072,
  //               4.2395,
  //               11.2072,
  //               4.2446,
  //               11.3798,
  //               4.072,
  //               11.3899
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 4403,
  //                 "length": 1
  //               }
  //             ]
  //           },
  //           {
  //             "content": "SIG",
  //             "polygon": [
  //               4.2751,
  //               11.197,
  //               4.6356,
  //               11.197,
  //               4.6356,
  //               11.3493,
  //               4.2802,
  //               11.3645
  //             ],
  //             "spans": [
  //               {
  //                 "offset": 4405,
  //                 "length": 3
  //               }
  //             ]
  //           }
  //         ],
  //         "spans": [
  //           {
  //             "offset": 0,
  //             "length": 4408
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // };

  ocrResults:any = {};
  invoiceData: any;
  totalPages: any;
  currentPage: number;
  mdiResponse: any;

  constructor(
    private ocrService: SocrOcrService,
    private activateRoute: ActivatedRoute,
    private http: HttpClient,
    private location: Location
  ) { }

  ngOnInit() {
    //this.ctx = this.documentCanvas.nativeElement.getContext('2d');
    this.activateRoute.params.subscribe((params: any) => {
      this.ocrId = params.docId;
      if (this.ocrId) {
        //this.getOCRDetails(this.ctx);
        //this.getOCRInvoiceById();
        //this.getOCR();
        //this.getInvoice();
      }
    });
  }

  ngAfterViewInit() {
    this.ctx = this.documentCanvas.nativeElement.getContext('2d');
    if (this.ocrId) {
      this.getInvoice();
    }
  }

  onBack() {
    this.location.back();
  }

  getInvoice() {
    this.ocrService.getInvoiceByRequestId(this.ocrId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.invoiceData = res.result;
        this.getMDIResponse();
        this.totalPages = this.invoiceData.totalPageNo;
        this.currentPage = 1;
        //this.updateStages();
        //if (this.invoiceData.stage != 'New' && this.invoiceData.stage != 'PageSeperation') {
          //this.selectedTab = 'Fields';
          //this.getImage(this.currentPage, this.ctx, this.invoiceData);
        //} else {
          // this.selectedTab = 'Logs';
          // this.commonService.downloadFile(this.invoiceData.attachment.systemId, this.invoiceData.attachment.documentid).subscribe({
          //   next: (res: any) => {
          //     this.imgUrl = res.status;
          //   },
          //   error: (err: any) => {
          //   }
          // });
        //}
      },
      error: (err: any) => {
      }
    })
  }

  getMDIResponse() {
    this.ocrService.getMDIResponse(this.invoiceData.requestId).subscribe({
      next: (res: any) => {
        this.mdiResponse = res.result;
        // if(this.mdiResponse && this.mdiResponse.tables) {
        //   this.getTableContent(this.mdiResponse.tables);
        // }
        
        if (this.invoiceData.stage != 'New' && this.invoiceData.stage != 'PageSeperation') {
          this.getImage(this.currentPage, this.ctx, this.mdiResponse);
          //this.getSOCRResponse();
        } else {
          // if(this.mdiResponse) {
          //   this.responseManupilation(this.mdiResponse);
          // }
        }        
      },
      error: (err: any) => {
      }
    })
  }


  getOCRInvoiceById() {
    this.ocrService.getOCRInvoiceById(this.ocrId).subscribe({
      next: (res: any) => {
        //console.log(res);
        this.invoiceOCRData = res.result;
      },
      error: (err: any) => {
      }
    })
  }

  getOCRDetails(ctx: CanvasRenderingContext2D | null = null) {
    this.ocrService.getFormDetail(this.ocrId).subscribe({
      next: (res: any) => {
        //console.log(res);
        this.ocrDetails = res;
        
        this.getImage(1, this.ctx, this.ocrDetails);
        
      },
      error: (err: any) => {
      }
    })
  }

  getImage(pageNumber: number, ctx: CanvasRenderingContext2D, ocrResults: any) {
    return this.http.get(`${this._apiUrl}formRecognizer/showImage/${this.invoiceData.taxId}/${pageNumber}`, { responseType: 'blob' }).subscribe((response: Blob) => {
        let image = new Image();
        let width = this.documentCanvas.nativeElement.width;
        let height = this.documentCanvas.nativeElement.height;
        image.src = URL.createObjectURL(response);

        image.onload = function () {
          ctx?.drawImage(image, 0, 0, width, height);
          const page = ocrResults.pages[pageNumber];

          const xScale = width / page.width;
          const yScale = height / page.height;

          let keys = Object.keys(ocrResults.documents[0].fields);

          keys.forEach((key:string) => {
            if(!ocrResults.documents[0].fields[key].boundingRegions || ocrResults.documents[0].fields[key].boundingRegions[0].pageNumber !== pageNumber) return;
           
            const polygon = ocrResults.documents[0].fields[key].boundingRegions[0].polygon;

            ctx?.beginPath();
            ctx?.moveTo(polygon[0].x * xScale, polygon[0].y * yScale);
            for (let i = 1; i < polygon.length; i++) {
              ctx?.lineTo(polygon[i].x * xScale, polygon[i].y * yScale);
            }
            ctx?.closePath();
            ctx?.stroke();
            ctx.strokeStyle = 'red';
          });
        };
    });
  }

  ngOnDestroy() { }

}
