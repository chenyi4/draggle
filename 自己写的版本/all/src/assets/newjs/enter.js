import Edits from './edit/edit.js'
import Base from './edit/base.js';
import Type1 from './modules/Type1.js';
import Module1 from './modules/Module1.js';
import draw from '@/store/Modules/draw';
import Inputtext1 from './modules/Input/Inputtext1';
import Textera1 from './modules/Input/Textera1';
import Select from './modules/Input/Select';
import Check from './modules/Input/Check';
import Radio from './modules/Input/Radio';
import DateInput from './modules/Input/DateInput';
import TimeInput from './modules/Input/TimeInput';
import DateTimeInput from './modules/Input/DateTimeInput';
import CusButton from './modules/Input/CusButton';
import TableBottom from './modules/table/TableBottom.js';
import PasswordInput from './modules/Input/PasswordInput';
import NumberInput from './modules/Input/NumberInput'
import TextWrite from './modules/Text/TextWrite';

class Back extends Base{
    constructor(dom){
        super(dom);
        let initAll;
        switch(
            this.className
            ||dom.item.typename 
        )
        {
            case 'type1':
                this.setName(dom, "type1");
                initAll = new Type1(dom);
                break; 
            case 'module1':
                this.setName(dom, "module1");
                initAll = new Module1(dom);
                break; 
            case 'inputtext1':
                this.setName(dom, "inputtext1");
                initAll = new Inputtext1(dom);
                break;
            case 'tableBottom':
                this.setName(dom, "tableBottom");
                initAll = new TableBottom(dom);
                break;
            case 'textera1':
                this.setName(dom, "textera1");
                initAll = new Textera1(dom);
                break;
            case 'select':
                this.setName(dom, "select");
                initAll = new Select(dom);
                break;
            case 'check':
                this.setName(dom, "check");
                initAll = new Check(dom);
                break;
            case 'radio':
                this.setName(dom, "radio");
                initAll = new Radio(dom);
                break;
            case 'dateinput':
                this.setName(dom,'dateinput');
                initAll = new DateInput(dom);
                break;
            case 'timeinput':
                this.setName(dom,'timeinput');
                initAll = new TimeInput(dom);
                break;
            case 'datetimeinput':
                this.setName(dom,'datetimeinput');
                initAll = new DateTimeInput(dom);
                break;
            case 'cusbutton':
                this.setName(dom,'cusbutton');
                initAll = new CusButton(dom);
                break;
            case 'passwordinput':
                this.setName(dom,'passwordinput');
                initAll = new PasswordInput(dom);
                break;
            case 'numberinput':
                this.setName(dom,'numberinput');
                initAll = new NumberInput(dom);
                break;
            case 'textwrite':
                this.setName(dom,'textwrite');
                initAll = new TextWrite(dom);
                break;
        }
        draw.state.allObjectSave.push(initAll);
        return initAll;
    }

    setName(dom, value){
        if(dom.item){
            dom.item.module = value;
        }
    }
}

export default Back;