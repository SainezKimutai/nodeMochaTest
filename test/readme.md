# Chai has several interfaces from which developers can choose from. They are:

##const chai = require("chai")

###const should = chai.should();

    foo.should.be.a('string');
    foo.should.equal('bar');
    foo.should.have.lengthOf(3);
    tea.should.have.property('flavors').with.lengthOf(3);


###const expect = chai.expect;

    expect(foo).to.be.a('string');
    expect(foo).to.equal('bar');
    expect(foo).to.have.lengthOf(3); expect(tea).to.have.property('flavors').with.lengthOf(3);



###const assert = chai.assert;

    assert.typeOf(foo, 'string');
    assert.equal(foo, 'bar');
    assert.lengthOf(foo, 3);
    assert.property(tea, 'flavors');
    assert.lengthOf(tea.flavors, 3);
